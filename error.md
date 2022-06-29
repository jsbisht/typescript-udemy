```ts
function print(value: any): void {
  console.dir(value);
}

print(1);
print("hello world");
print({ a: 10, b: 20 });
```

Will give you following error:

```
index.ts:1:10 - error TS2384: Overload signatures must all be ambient or non-ambient.

1 function print(value: any): void {
           ~~~~~

node_modules/typescript/lib/lib.dom.d.ts:17768:18 - error TS2394: This overload signature is not compatible with its implementation signature.

17768 declare function print(): void;
                       ~~~~~

  index.ts:1:10
    1 function print(value: any): void {
               ~~~~~
    The implementation signature is declared here.


Found 2 errors in 2 files.
```

This error is because we already have a native method `window.print()`.

If you rename your function from `print` to say `output` or anything else, this error will not be thrown.
