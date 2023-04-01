const content = await Deno.readTextFile('./input.txt');
const lines = content.split('\n\n').map(group => group.split('\n'));

let highest = 0;

for (const line of lines) {
  const numbers = line.map(l => parseInt(l));
  const totalCalories = numbers.reduce((acc, cal) => {
    acc += cal;

    return acc;
  });

  if (totalCalories > highest) {
    highest = totalCalories;
  }
}

console.log('highest', highest);
