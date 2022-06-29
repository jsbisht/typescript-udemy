let fn: (n1: number, n2: number) => number;

function add(n1: number, n2: number): number {
  return n1 + n2;
}
function compare(n1: number, n2: number): boolean {
  return n1 - n2 > 0;
}

fn = add;

setTimeout(fn, 100);

fn = compare;

setTimeout(fn, 100);
