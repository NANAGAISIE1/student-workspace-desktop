export type DocumentInfo = {
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetDocuments = () => Promise<DocumentInfo[]>;
export type DocumentContent = string;
export type ReadDocument = (
  title: DocumentInfo["title"],
) => Promise<DocumentContent>;
export type WriteDocument = (
  title: DocumentInfo["title"],
  content: DocumentContent,
) => Promise<void>;
export type CreateDocument = () => Promise<DocumentInfo["title"] | false>;
export type DeleteDocument = (title: DocumentInfo["title"]) => Promise<boolean>;
