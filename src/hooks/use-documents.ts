// import { useDocumentsStore } from "@/store";
// import { DocumentContent, DocumentInfo } from "@shared/types";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { debounce } from "lodash";

// // API functions
// const api = {
//   getDocuments: async (): Promise<DocumentInfo[]> => {
//     const documents = await window.documents.getDocuments();
//     return documents.sort(
//       (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
//     );
//   },
//   readDocument: async (title: string): Promise<string> => {
//     return window.documents.readDocument(title);
//   },
//   writeDocument: debounce(
//     async (title: string, content: DocumentContent): Promise<void> => {
//       await window.documents.writeDocument(title, content);
//     },
//     50,
//     {},
//   ),
//   createDocument: async (): Promise<string | boolean> => {
//     return window.documents.createDocument();
//   },
//   deleteDocument: async (title: string): Promise<boolean> => {
//     return window.documents.deleteDocument(title);
//   },
// };

// // Custom hooks
// export const useDocuments = () => {
//   const queryClient = useQueryClient();
//   const {
//     selectedDocumentIndex,
//     setSelectedDocumentIndex,
//   } = useDocumentsStore();

//   const { data: documents, isLoading, error } = useQuery({
//     queryKey: ["documents"],
//     queryFn: api.getDocuments,
//   });

//   const createDocumentMutation = useMutation({
//     mutationFn: api.createDocument,
//     onSuccess: async (newTitle) => {
//       if (newTitle) {
//         await queryClient.invalidateQueries({ queryKey: ["documents"] });
//         setSelectedDocumentIndex(0);
//       }
//     },
//   });

//   const deleteDocumentMutation = useMutation({
//     mutationFn: api.deleteDocument,
//     onSuccess: async (isDeleted, deletedTitle) => {
//       if (isDeleted) {
//         await queryClient.invalidateQueries({ queryKey: ["documents"] });
//         setSelectedDocumentIndex(null);
//       }
//     },
//   });

//   const handleDocumentSelect = (index: number) => {
//     setSelectedDocumentIndex(index);
//   };

//   return {
//     documents,
//     isLoading,
//     error,
//     selectedDocumentIndex,
//     handleDocumentSelect,
//     createDocument: createDocumentMutation.mutate,
//     deleteDocument: deleteDocumentMutation.mutate,
//   };
// };

// export const useSelectedDocument = () => {
//   const queryClient = useQueryClient();
//   const { selectedDocumentIndex } = useDocumentsStore();
//   const documents = queryClient.getQueryData<DocumentInfo[]>(["documents"]);

//   const selectedDocument =
//     documents && selectedDocumentIndex !== null
//       ? documents[selectedDocumentIndex]
//       : null;

//   const { data: noteContent, isLoading, error } = useQuery({
//     queryKey: ["note", selectedDocument?.title],
//     queryFn: () =>
//       selectedDocument ? api.readDocument(selectedDocument.title) : null,
//     enabled: !!selectedDocument,
//   });

//   const saveDocumentMutation = useMutation({
//     mutationFn: async (newContent: DocumentContent): Promise<void> => {
//       if (selectedDocument) {
//         await api.writeDocument(selectedDocument.title, newContent);
//       } else {
//         throw new Error("No note selected");
//       }
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["documents"] });
//       queryClient.invalidateQueries({
//         queryKey: ["note", selectedDocument?.title],
//       });
//     },
//   });

//   return {
//     selectedDocument: selectedDocument
//       ? { ...selectedDocument, content: noteContent || "" }
//       : null,
//     isLoading,
//     error,
//     saveDocument: saveDocumentMutation.mutate,
//   };
// };
