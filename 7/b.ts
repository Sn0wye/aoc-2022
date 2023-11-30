const lines = (await Deno.readTextFile('./input.txt')).split('\n');

type Dir = {
  parent?: Dir;
  files: { [name: string]: number };
  dirs: { [name: string]: Dir };
};

type Command = 'cd' | 'ls';

const filesystem: Dir = { parent: undefined, files: {}, dirs: {} };
let currentDir = filesystem;

const isCommand = (line: string) => line.startsWith('$');

lines.forEach(line => {
  if (isCommand(line)) {
    const sanitized = line.slice(2);
    const [command, dir] = sanitized.split(' ') as [Command, string];

    if (command === 'cd') {
      if (dir === '/') {
        currentDir = filesystem;
        return;
      }

      if (dir === '..') {
        if (currentDir.parent) {
          currentDir = currentDir.parent;
        }
        return;
      }

      if (!currentDir.dirs[dir]) {
        currentDir.dirs[dir] = { parent: currentDir, files: {}, dirs: {} };
      }
      currentDir = currentDir.dirs[dir];
    }
    return;
  }

  // it is listing files
  const [first, second] = line.split(' ');

  if (first === 'dir') {
    currentDir.dirs[second] = { parent: currentDir, dirs: {}, files: {} };
  } else {
    // its a file
    currentDir.files[second] = parseInt(first);
  }
});

const dirSizes: number[] = [];

const computeFileSize = (dir: Dir): number => {
  let size = 0;

  for (const file in dir.files) {
    size += dir.files[file];
  }

  for (const dirName in dir.dirs) {
    const dirSize = computeFileSize(dir.dirs[dirName]);
    size += dirSize;
    dirSizes.push(dirSize);
  }

  return size;
};

computeFileSize(filesystem);

const rootSize = computeFileSize(filesystem);

const smallestThatFixesSpace = Math.min(
  ...dirSizes.filter(x => x >= 30000000 - (70000000 - rootSize))
);
console.log('part 2:', smallestThatFixesSpace);
