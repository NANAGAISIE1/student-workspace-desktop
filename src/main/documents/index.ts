import { appDirectoryName, fileEncoding } from "@shared/constants.js";
import { homedir } from "node:os";
import { ensureDir, remove } from "fs-extra/esm";
import { writeFile, readFile, readdir, stat, access } from "node:fs/promises";
import {
  CreateDocument,
  DeleteDocument,
  DocumentInfo,
  GetDocuments,
  ReadDocument,
  WriteDocument,
} from "@shared/types.js";
import path from "node:path";
import { dialog } from "electron";

export const getRootDir = () => {
  return path.join(`${homedir}`, `${appDirectoryName}`);
};

export const getDocuments: GetDocuments = async () => {
  const rootDir = getRootDir();
  await ensureDir(rootDir);

  const documentFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false,
  });

  const documents = documentFileNames.filter((fileName) => {
    return fileName.endsWith(".json");
  });

  return Promise.all(documents.map(getDocumentInfoFromFileName));
};

export const getDocumentInfoFromFileName = async (
  fileName: string,
): Promise<DocumentInfo> => {
  const documentStats = await stat(`${getRootDir()}/${fileName}`);

  return {
    title: fileName.replace(/\.json$/, ""),
    updatedAt: documentStats.mtime,
    createdAt: documentStats.ctime,
  };
};

export const readDocument: ReadDocument = async (filename) => {
  const rootDir = getRootDir();

  return readFile(`${rootDir}/${filename}.json`, { encoding: fileEncoding });
};

export const writeDocument: WriteDocument = async (filename, content) => {
  const rootDir = getRootDir();

  console.info(`Writing note ${filename}`);
  return writeFile(`${rootDir}/${filename}.json`, content, {
    encoding: fileEncoding,
  });
};

export const createDocuments: CreateDocument = async () => {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: "New note",
    defaultPath: `${rootDir}/Untitled.json`,
    buttonLabel: "Create",
    properties: ["showOverwriteConfirmation"],
    showsTagField: false,
    filters: [{ name: "Document", extensions: ["json"] }],
  });

  if (canceled || !filePath) {
    console.info("Document creation canceled");
    return false;
  }

  const { name: filename, dir: parentDir } = path.parse(filePath);

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: "error",
      title: "Creation failed",
      message: `All notes must be saved under ${rootDir}.
      Avoid using other directories!`,
    });

    return false;
  }

  console.info(`Creating note: ${filePath}`);
  await writeFile(filePath, "");

  return filename;
};

export const createDocument: CreateDocument = async () => {
  const rootDir = getRootDir();

  // Ensure the root directory exists
  await ensureDir(rootDir);

  let filename = "Untitled.json";
  let counter = 1;
  let filePath = path.join(rootDir, filename);

  console.info(`Creating note: ${filePath}`);

  // Check if the file already exists and increment the counter if necessary
  while (await fileExists(filePath)) {
    filename = `Untitled-${counter}.json`;
    filePath = path.join(rootDir, filename);
    counter++;
  }

  // Create an empty file
  await writeFile(filePath, "");

  const cleanedFilename = filename.replace(/\.json$/, "");

  return cleanedFilename;
};

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export const deleteDocument: DeleteDocument = async (filename) => {
  const rootDir = getRootDir();

  const { response } = await dialog.showMessageBox({
    type: "warning",
    title: "Delete note",
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ["Delete", "Cancel"], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1,
  });

  if (response === 1) {
    console.info("Document deletion canceled");
    return false;
  }

  console.info(`Deleting note: ${filename}`);
  await remove(`${rootDir}/${filename}.json`);
  return true;
};
