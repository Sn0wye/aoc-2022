const input = await Deno.readTextFile('./input.txt');

const chars = input.split('');

for (let i = 13; i < chars.length; i++) {
  const asSet = new Set(chars.slice(i - 14, i));

  if (asSet.size === 14) {
    console.log(i);
    break;
  }
}
