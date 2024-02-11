import path from 'path';
import fs, { Dirent, Stats } from 'fs';
import {
  DirectoryPath,
  FilePath,
  FileService as FileServiceInterface,
  FilesTree,
} from '@/lib/interfaces';

export class FileService implements FileServiceInterface {
  getTree(directory: string): (FilePath | FilesTree)[] {
    let filesTree: (FilePath | FilesTree)[] = [];
    const files = this.readDir(directory);

    for (const file of files) {
      const absolute = path.join(directory, file.name);
      const relative = path.relative(process.cwd(), absolute);
      if (file.isDirectory()) {
        filesTree = filesTree.concat({
          directory: {
            absolutePath: absolute,
            directoryName: file.name,
            relativePath: relative,
          },
          children: this.getTree(absolute),
        });
      } else {
        filesTree.push({
          absolutePath: path.join(directory, '/'),
          fileName: file.name,
          relativePath: relative.replace(file.name, ''),
        });
      }
    }
    return filesTree;
  }

  private readDir(directory: string): Dirent[] {
    return fs.readdirSync(directory, {
      withFileTypes: true,
    });
  }

  readFileContent(path: string): string {
    if (!this.getFileStats(path).isFile()) {
      throw new Error(`Given path "${path}" is not a file`);
    }
    return fs.readFileSync(path, 'utf8');
  }

  getFileStats(path: string): Stats {
    if (fs.existsSync(path)) {
      throw new Error(`File on path "${path}" not found`);
    }
    return fs.statSync(path);
  }

  isFilesTree(file: FilePath | FilesTree): file is FilesTree {
    return 'directory' in file;
  }

  isFilePath(file: FilePath | FilesTree): file is FilePath {
    return 'fileName' in file;
  }

  isDirectory(file: FilePath | DirectoryPath): file is DirectoryPath {
    return 'directoryName' in file;
  }
}
