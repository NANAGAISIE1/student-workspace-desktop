import { JWT, SignUpOutput } from "aws-amplify/auth";
import {
  CreateDocument,
  DeleteDocument,
  GetDocuments,
  ReadDocument,
  WriteDocument,
} from "../shared/types";

interface ElectronAPI {
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  signUp: ({
    email: string,
    password: string,
    name: string,
  }) => Promise<{
    success: boolean;
    user: SignUpOutput;
    error?: undefined;
  }>;
  getSession: () => JWT;
  signOut: () => Promise<{
    success: boolean;
    error?: undefined;
  }>;
}

interface DocumentAPI {
  getDocuments: GetDocuments;
  readDocument: ReadDocument;
  writeDocument: WriteDocument;
  createDocument: CreateDocument;
  deleteDocument: DeleteDocument;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    documents: DocumentAPI;
  }
}

export {};
