import path from 'path';

import { FileService } from './FileService';

const testDataPath = path.join(__dirname, '../__testData__');
const fileService = new FileService();

it('should get file and directory status', () => {
  const file = fileService.getFileStats(testDataPath + '/test.md');
  const directory = fileService.getFileStats(testDataPath);

  expect(file).toHaveProperty('mtime');
  expect(file).toHaveProperty('ctime');
  expect(directory).toHaveProperty('mtime');
  expect(directory).toHaveProperty('ctime');
});

it('should read file content', () => {
  const fileContent = fileService.readFileContent(testDataPath + '/test.md');

  expect(fileContent).toContain('title: title');
});

it('should build files tree', () => {
  const filesTree = fileService.getTree(testDataPath);
  expect(filesTree.length).toBe(3);
  expect('directory' in filesTree[0]).toBe(true);
  expect('directory' in filesTree[1]).toBe(true);
  if ('directory' in filesTree[0]) {
    expect(filesTree[0].directory.directoryName).toBe('dir1');
    expect(filesTree[0].children.length).toBe(3);
  }
  if ('directory' in filesTree[1]) {
    expect(filesTree[1].directory.directoryName).toBe('dir2');
    expect(filesTree[1].children.length).toBe(2);
    expect(filesTree[1].children[0]).toMatchObject({
      relativePath: 'src/lib/services/__testData__/dir2/',
      fileName: 'file21.md',
    });
  }
});

it('should check if file is a directory', () => {
  let isDir = fileService.isDirectory({
    directoryName: 'dir1',
    absolutePath: testDataPath,
    relativePath: '',
  });
  expect(isDir).toBe(true);

  isDir = fileService.isDirectory({
    fileName: 'file21.md',
    absolutePath: '',
    relativePath: '',
  });
  expect(isDir).toBe(false);
});

it('should check if file is a files tree', () => {
  let isFilesTree = fileService.isFilesTree({
    fileName: 'file21.md',
    absolutePath: '',
    relativePath: '',
  });
  expect(isFilesTree).toBe(false);

  isFilesTree = fileService.isFilesTree({
    directory: { absolutePath: '', directoryName: '', relativePath: '' },
    children: [],
  });
  expect(isFilesTree).toBe(true);
});

it('should check if file is a file path', () => {
  let isFilePath = fileService.isFilePath({
    fileName: 'file21.md',
    absolutePath: '',
    relativePath: '',
  });
  expect(isFilePath).toBe(true);

  isFilePath = fileService.isFilePath({
    directory: { absolutePath: '', directoryName: '', relativePath: '' },
    children: [],
  });
  expect(isFilePath).toBe(false);
});
