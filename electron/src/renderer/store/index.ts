import { create } from "zustand";

// Zustand store
interface DocumentsState {
  selectedDocumentIndex: number | null;
  setSelectedDocumentIndex: (index: number | null) => void;
}

export const useDocumentsStore = create<DocumentsState>((set) => ({
  selectedDocumentIndex: null,
  setSelectedDocumentIndex: (index) => set({ selectedDocumentIndex: index }),
}));
