const crates = [
  ['S', 'C', 'V', 'N'], // stack 1
  ['Z', 'M', 'J', 'H', 'N', 'S'], // stack 2
  ['M', 'C', 'T', 'G', 'J', 'N', 'D'], // stack 3
  ['T', 'D', 'F', 'J', 'W', 'R', 'M'], // stack 4
  ['P', 'F', 'H'], // stack 5
  ['C', 'T', 'Z', 'H', 'J'], // stack 6
  ['D', 'P', 'R', 'Q', 'F', 'S', 'L', 'Z'], // stack 7
  ['C', 'S', 'L', 'H', 'D', 'F', 'P', 'W'], // stack 8
  ['D', 'S', 'M', 'P', 'F', 'N', 'G', 'Z'] // stack 9
];

const input = await Deno.readTextFile('input.txt');
const instructions = input.split('\n');
instructions.forEach(instruction => {
  const stripped = instruction.split(' ');

  // Number of items to move
  const move = parseInt(stripped[1]);

  // Get where to take the items from and where to put them
  const from = parseInt(stripped[3]);
  const to = parseInt(stripped[5]);

  // Get the indexes (-1 because arrays start at 0)
  const fromIndex = crates[from - 1];
  const toIndex = crates[to - 1];

  // Get the items that will be moved (negative index to get the last items)
  const toMove = fromIndex.splice(-move).reverse();

  // Add the items to the end of the row
  crates[to - 1] = [...toIndex, ...toMove];
});

// Get the last item of each row
const lastItems = crates.map(row => row[row.length - 1]);
const result = lastItems.join('');

console.log(result);
