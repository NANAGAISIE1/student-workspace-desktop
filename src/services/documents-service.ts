import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import { useMutation } from "convex/react";
import { useQuery } from "convex-helpers/react/cache/hooks";

export function useDocument() {
  const getDocumentById = (id: Id<"documents">) =>
    useQuery(api.documents.query.getDocument, { id });

  const getDocuments = () => useQuery(api.documents.query.getDocuments);

  const createDocument = useMutation(api.documents.mutation.createDocument);

  const updateDocument = useMutation(api.documents.mutation.updateDocument);

  const deleteDocument = useMutation(api.documents.mutation.removeDocument);

  return {
    getDocumentById,
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
  };
}
