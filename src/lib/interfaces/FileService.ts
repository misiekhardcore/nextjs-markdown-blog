import { Stats } from 'fs';

type Paths = { absolutePath: string; relativePath: string };
export type FilePath = Paths & { fileName: string };
export type DirectoryPath = Paths & { directoryName: string };
export type FilesTree = { directory: DirectoryPath; children: (FilePath | FilesTree)[] };

export interface FileService {
  getTree(directory: string): (FilePath | FilesTree)[];
  readFileContent(path: string): string;
  getFileStats(path: string): Stats;
  isFilesTree(file: FilePath | FilesTree): file is FilesTree;
  isFilePath(file: FilePath | FilesTree): file is FilePath;
  isDirectory(file: FilePath | DirectoryPath): file is DirectoryPath;
}
