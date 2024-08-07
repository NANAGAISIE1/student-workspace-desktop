import { useDocumentsStore } from "@renderer/store";
import { DocumentContent, DocumentInfo } from "@shared/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// API functions
const api = {
  getDocuments: async (): Promise<DocumentInfo[]> => {
    const documents = await window.documents.getDocuments();
    return documents.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    );
  },
  readDocument: async (title: string): Promise<string> => {
    return window.documents.readDocument(title);
  },
  writeDocument: async (
    title: string,
    content: DocumentContent,
  ): Promise<void> => {
    await window.documents.writeDocument(title, content);
  },
  createDocument: async (): Promise<string | boolean> => {
    return window.documents.createDocument();
  },
  deleteDocument: async (title: string): Promise<boolean> => {
    return window.documents.deleteDocument(title);
  },
};

// Custom hooks
export const useDocuments = () => {
  const queryClient = useQueryClient();
  const {
    selectedDocumentIndex,
    setSelectedDocumentIndex,
  } = useDocumentsStore();

  const { data: documents, isLoading, error } = useQuery({
    queryKey: ["documents"],
    queryFn: api.getDocuments,
  });

  const createDocumentMutation = useMutation({
    mutationFn: api.createDocument,
    onSuccess: async (newTitle) => {
      if (newTitle) {
        await queryClient.invalidateQueries({ queryKey: ["documents"] });
        setSelectedDocumentIndex(0);
      }
    },
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: api.deleteDocument,
    onSuccess: async (isDeleted, deletedTitle) => {
      if (isDeleted) {
        await queryClient.invalidateQueries({ queryKey: ["documents"] });
        setSelectedDocumentIndex(null);
      }
    },
  });

  const handleDocumentSelect = (index: number) => {
    setSelectedDocumentIndex(index);
  };

  return {
    documents,
    isLoading,
    error,
    selectedDocumentIndex,
    handleDocumentSelect,
    createDocument: createDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
  };
};

export const useSelectedDocument = () => {
  const queryClient = useQueryClient();
  const { selectedDocumentIndex } = useDocumentsStore();
  const documents = queryClient.getQueryData<DocumentInfo[]>(["documents"]);

  const selectedDocument =
    documents && selectedDocumentIndex !== null
      ? documents[selectedDocumentIndex]
      : null;

  const { data: noteContent, isLoading, error } = useQuery({
    queryKey: ["note", selectedDocument?.title],
    queryFn: () =>
      selectedDocument ? api.readDocument(selectedDocument.title) : null,
    enabled: !!selectedDocument,
  });

  const saveDocumentMutation = useMutation({
    mutationFn: (newContent: DocumentContent) =>
      selectedDocument
        ? api.writeDocument(selectedDocument.title, newContent)
        : Promise.reject("No note selected"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({
        queryKey: ["note", selectedDocument?.title],
      });
    },
  });

  return {
    selectedDocument: selectedDocument
      ? { ...selectedDocument, content: noteContent || "" }
      : null,
    isLoading,
    error,
    saveDocument: saveDocumentMutation.mutate,
  };
};
