const getPriority = (item: string) => {
  return item.charCodeAt(0) - (item.charCodeAt(0) < 91 ? 38 : 96);
};

const input = await Deno.readTextFile('./input.txt');

const backpacks = input.split('\n');

const groups: [string, string, string][] = [];

// Split backpacks into chunks of 3
for (let i = 0; i < backpacks.length; i += 3) {
  groups.push(backpacks.slice(i, i + 3) as [string, string, string]);
}

let totalPriority = 0;

// find the overlapping characters between them
groups.forEach(([first, second, third]) => {
  const overlap = [...new Set([...first, ...second, ...third])]
    .filter(c => first.includes(c) && second.includes(c) && third.includes(c))
    .join('');

  // add the priority of the overlapping characters to the total
  totalPriority += getPriority(overlap);
});

console.log('totalPriority', totalPriority);
