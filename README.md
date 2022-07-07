> typescript-udemy

---

# Types

## Core Types

### string

### boolean

### number

If while adding two numbers, first number is a string, javascript will convert the other to string as well.

```js
function add(n1, n2) {
  return n1 + n2;
}

add("10", 10); // 1010
```

But with typescript, we can get an compile time error:

```ts
function add(n1: number, n2: number) {
  return n1 + n2;
}

// error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
add("10", 10);
```

We can add checks with Javasript, but we can only get an run time error with this:

```js
function add(n1, n2) {
  if (typeof n1 !== number && typeof n2 !== number) {
    throw new Error("Invalid input parameters");
  }
  return n1 + n2;
}

add("10", 10);
```

NOTE: Javascript uses dynamic types (i.e. resolved at runtime). Typescript uses static types (i.e. resolved at compile time).

NOTE: The core primitive types in TypeScript are all lowercase. It is string and number (etc.), NOT String, Number etc.

### object

We can explicitly define type of an Javascript object as follows. The following is redundant as Typescript will be implicitly infer the type of the `person` as `object`.

```ts
const person: object = {
  name: "Jagdeep",
  age: 30,
};
```

We could define the shape of the object as follows:

```ts
const person: { name: string; age: number } = {
  name: "Jagdeep",
  age: 30,
};
```

### Array

To specify types for an array, we need to add type as follows:

```ts
const names: string[] = ["Jagdeep", "John", "James"];
```

### Tuple

When we want a mixed array, we can define the types using Tuple as follows:

```ts
const id = 12345;
const value = "hello world";
const tuple: [number, string] = [id, value];
```

You could define multipe array items types as well:

```ts
const id = 12345;
const language = "Javascript";
const description = "Program the web";
const tuple: [number, string, string] = [id, language, description];
```

### Enum

When we want fixed list of items with assigned values, we can use a `enum` as follows:

```ts
enum Environment {
  DEV = "localhost:3000",
  PPE = "ppe.example.com",
  PROD = "prod.example.com",
}

console.log(Environment.DEV);
console.log(Environment.PPE);
console.log(Environment.PROD);
```

### any

If you want to skip type checks in certain scenarios, `any` can be used to overcome Typescript type checking.

```ts
function output(value: any): void {
  console.dir(value);
}

output(1);
output("hello world");
output({ a: 10, b: 20 });
```

### unknown

If you assign variable declared with `any` to variable declared with type say `string`, then typescript wouldnt through an error.

```ts
let a: any;

let b: string = "hello world";

b = a;
```

But if you dont want such assignments to be made, you should declare variables with `unknown` instead of `any` as follows:

```ts
let a: unknown;

let b: string = "hello world";

// error TS2322: Type 'unknown' is not assignable to type 'string'
b = a;
```

To allow the assignment of `unknown` type variable, you need to add a type check as follows:

```ts
let a: unknown;

let b: string = "hello world";

if (typeof a === "string") {
  b = a;
}
```

## Other Types

### Union

Some functions can work with multiple input types. To restrict the input types to particular core types, we can use union types.

If we want a particular variable to be either string or number, we can define it as follows:

```ts
let key: number | string;
```

The same can be used in function defination as follows:

```ts
function isValidKey(key: number | string) {
  if (typeof key === number) {
    return key > 100 && key < 1000;
  }
  if (typeof key === string) {
    return ["abc", "xyz"].includes(key);
  }
}
```

### Literal

You could also define union types without using core data types:

```ts
let environment: "production" | "development";
```

If you try assigning values to `environment`:

```ts
let environment: "production" | "development";

environment = "development";
// error TS2322: Type '"test"' is not assignable to type '"production" | "development"'
environment = "test";
```

### Type Alias

Instead of declaring the tuple multiple time, we could use type `alias` instead and use that everywhere. This is done using `type` as follows:

```ts
type DatabaseKeyType = number | string;
```

Now instead of the tuple, we could use the alias instead.

```ts
function isValidKey(key: DatabaseKeyType) {
  if (typeof key === number) {
    return key > 100 && key < 1000;
  }
  if (typeof key === string) {
    return ["abc", "xyz"].includes(key);
  }
}
```

Apart from creating types using core types, we could do the same using type literals as well:

```ts
type Environment = "production" | "development";

let environment: Environment = process.env.NODE_ENV;
```

Also, type alias can be used not just for tuple but for any custom types:

```ts
type Person = {
  name: string;
  age: number;
};
```

## Function and Types

Typescript can automatically infer types. In following case, typescript can determine implicitly that the result of add function will always be a `number`.

```ts
function add(n1: number, n2: number) {
  return n1 + n2;
}
```

### void

A function which returns nothing, will be considered as returning `void` by javascript. You can explicitly declare the same as follows:

```ts
function output(): void {
  console.log("hello world");
}
```

NOTE: void is not defined in Javascript. It is only available within Typescript.

### undefined

Even though `undefined` is a value within Javascript. It has special meaning within Typescript. While using this as a function return type, we are explicitly defining that the function will return `undefined`.

However, this can only be used when function is explicitly returning `undefined` otherwise it will through an error.

```ts
// error TS2355: A function whose declared type is neither 'void' nor 'any' must return a value.
function output(): undefined {
  console.log("hello world");
}
```

Valid usage of this keyword is with a return statement not returning any value:

```ts
function output(): undefined {
  console.log("hello world");
  return;
}
```

### never

In cases when your function is supposed to never return any value ever, you can declare the return type as `never`. Take for example the following function which will disrupt the script and the function would not be returning any value:

````ts
function generateError(message: string, code: number): never {
  throw { message, code }
}
```

## Function type

In Javascript, its possible to assign reference of the function to a variable. To prevent unintentional assignment to such variable, we can define `Function` type to the variable:

```ts
function output() {
  console.log("hello world");
}

let fn: Function;

fn = output;
setTimeout(fn, 100);

// error TS2322: Type 'string' is not assignable to type 'Function'
fn = "oops !!!";
setTimeout(fn, 100);
````

The `Function` type will prevent assignment of any other type, but thats not enough when you need to use only particular functions. To address this, we can define function signatures as well such that only functions matching the signature defined can be assigned.

```ts
function output() {
  console.log("hello world");
}

function add(n1: number, n2: number) {
  return n1 + n2;
}

let fn: () => void;

fn = output;
setTimeout(fn, 100);

// error TS2322: Type '(n1: number, n2: number) => number' is not assignable to type '() => void'
fn = add;
setTimeout(fn, 100);
```

Similar would be case in the below example:

```ts
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
```

But this behaviour is different when the function type has a return type of `void`. When the return `type` is void, its equivalent to saying that the we dont care about the return type of the function. So, the following code will compile without any errors.

```ts
let fn: (n1: number, n2: number) => void;

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
```

# Classes

Class based creation of object is an alternative to object literals.

## Class field (aka property)

You can add a class property as follows:

```ts
class Person {
  name: string;
}
```

## Constructor function

You can create a constructor function which takes the params required to initialize class properties.

```ts
class Person {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
}
```

To create the object, we use the `new` operator as follows:

```ts
const james = new Person("James Smith");
```

### ES6 equivalent

The above class declaration when transpiled into ES6 would result in:

```js
class Person {
  constructor(n: string) {
    this.name = n;
  }
}
```

This is because the ES6 syntax doesnt allow class level property declarations.

### ES5 equivalent

The ES5 equivalent would look like this:

```js
var Person = (function () {
  function Person(n) {
    this.name = n;
  }
  return Person;
})();
```

which is same as:

```js
function Person(n) {
  this.name = n;
}
```

These declarations had an issue. If you invoked them with `new` as follows, they would work as expected:

```js
var person = new Person("James Smith");
```

But if you missed using `new` while calling the constructor function, `this.name` would create a property on global object which is `window` in browser.

```js
var person = Person("James Smith");

console.log(person); // undefined
console.log(window.name); // James Smith
```

NOTE: With class if you try creating an instance without `new` you will get an error:

> VM1285:1 Uncaught TypeError: Class constructor Person1 cannot be invoked without 'new'

## Class method

We can add function as property of the class as follows:

```ts
class Person {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log("Person name", this.name);
  }
}
```

### Class method assignment

Note that even though a function is assigned on the `class`, it can be assigned outside.

```ts
const james = new Person("James Smith");

const human = {
  name: 'human being'
  info: james.describe,
};
```

In this case you could still call `describe` as:

```ts
human.describe(); // human being
```

But here since describe is being called with `human` object instance.

### Restricting method this reference

To restrict method invocation with only limited object types, we can declare the type for `this` within a function:

```ts
class Person {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Person) {
    console.log("Person name", this.name);
  }
}
```

## private and public properties

To prevent access to a class property, Typescript unlike older Javascript versions provides declaring `private` properties. Though properties are public by default, you can still use `public` keyword to specify property type.

```ts
const james = new Person();
// modification allowed as name is a public property
james.name = "Mohan Das";
```

But you can prevent the above as follows:

```ts
class Person {
  private name: string;

  constructor(n: string) {
    this.name = n;
  }

  setName(name) {
    // add validation here
    this.name = name;
  }

  describe(this: Person) {
    console.log("Person name", this.name);
  }
}
```

Now you can allow modification only though an interface and prevent direct access.

## constructor shorthand initialization

If you use `public` or `private` keywords while declaring the constuctor function params, you can skip declaring the class property and manual assignment of constructor parameters to class properties.

For example, the following class:

```
class Person {
  name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  describe(this: Person) {
    console.log("Person name", this.name);
  }
}
```

can be declared as follows:

```ts
class Person {
  constructor(public name: string, public age: number) {}

  describe(this: Person) {
    console.log("Person name", this.name);
    console.log("Person age", this.age);
  }
}
```

NOTE: constructor shorthand requires the use of `public` or `private` keywords for the params. Or else, those properties will not be generated.

```ts
class Person {
  constructor(public name: string, age: number) {}

  describe(this: Person) {
    console.log("Person name", this.name);

    // error TS2339: Property 'age' does not exist on type 'Person'.
    console.log("Person age", this.age);
  }
}
```

## readonly properties

To explicitly declare a property as constant i.e. a property which wont change after its initialized once, we can use `readonly` modifier on such properties.

```ts
class Price {
  readonly value: number;
  offerprice: number;

  constructor(total) {
    this.value = total;
  }

  setValue(discount) {
    this.offerprice = this.value * discount;

    // error TS2540: Cannot assign to 'value' because it is a read-only property
    this.value = discount;
  }
}
```
