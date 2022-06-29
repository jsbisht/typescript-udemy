var fn;
function add(n1, n2) {
    return n1 + n2;
}
function compare(n1, n2) {
    return n1 - n2 > 0;
}
fn = add;
setTimeout(fn, 100);
fn = compare;
setTimeout(fn, 100);
