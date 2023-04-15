// Utils

type Period = {
  start: number;
  end: number;
};

const isContained = (period1: Period, period2: Period) => {
  if (period1.start >= period2.start && period1.end <= period2.end) {
    return true;
  }

  if (period1.start <= period2.start && period1.end >= period2.end) {
    return true;
  }

  return false;
};
// Main
const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');
const periods = lines.map(line => line.split(','));

let overlaps = 0;

periods.forEach(period => {
  const [p1Start, p1End] = period[0].split('-');
  const [p2Start, p2End] = period[1].split('-');

  const p1 = {
    start: parseInt(p1Start),
    end: parseInt(p1End)
  };

  const p2 = {
    start: parseInt(p2Start),
    end: parseInt(p2End)
  };

  const hasOverlap = isContained(p1, p2);

  if (hasOverlap) overlaps++;
});

console.log(overlaps);
