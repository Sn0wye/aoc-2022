const content = await Deno.readTextFile('./input.txt');
const lines = content.split('\n\n').map(group => group.split('\n'));

const groups: number[] = [];

for (const line of lines) {
  const numbers = line.map(l => parseInt(l));
  const totalCalories = numbers.reduce((acc, cal) => {
    acc += cal;

    return acc;
  });

  groups.push(totalCalories);
}

const topThree = groups.sort((a, b) => b - a).slice(0, 3);

const total = topThree.reduce((a, b) => a + b);

console.log('topThree', topThree);
console.log('total', total);
