const input = await Deno.readTextFile('./input.txt');

const backpacks = input.split('\n').map(bp => {
  const half = bp.length / 2;
  const leftHalf = bp.slice(0, half);
  const rightHalf = bp.slice(half);
  return [leftHalf, rightHalf] as [string, string];
});

const getPriority = (item: string) => {
  return item.charCodeAt(0) - (item.charCodeAt(0) < 91 ? 38 : 96);
};

let totalPriority = 0;

for (const [left, right] of backpacks) {
  const overlappingChars = [...new Set([...left, ...right])]
    .filter(char => left.includes(char) && right.includes(char))
    .join('');

  totalPriority += getPriority(overlappingChars);
}

console.log(totalPriority);
