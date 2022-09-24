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

TODO - add remaining info

# Advanced Types

## Intersection

If you had two types as follows:

```ts
type SuccessResponse = {
  data: object;
  err: boolean;
};

type ErrorResponse = {
  err: boolean;
  msg: string;
};
```

You could create a type which is a combination of these two as follows:

```ts
type ApiResponse = SuccessResponse & ErrorResponse;
```

which is equivalnt to defining:

```ts
type ApiResponse = {
  data: object;
  err: boolean;
  msg: string;
};
```

## Type Guard

### primitives

While using Union types, we need to know which type we are getting eventually. Consider following for example:

```ts
type Combinable = string | number;

function add(x: Combinable, y: Combinable) {
  // following is a type guard
  if (x === "string" || y === "string") {
    return x.toString() + y.toString();
  }
  return x + y;
}
```

The if statement here is acting as a `type guard` and validating the type at runtime.

### object

But in case the union types are not primitive types but object types instead, we need to add type guard as a bit differently. Consider the following union type:

```ts
type SuccessResponse = {
  data: object;
  err: boolean;
};

type ErrorResponse = {
  err: boolean;
  msg: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;
```

NOTE: Typescript doesnt allow adding type check as follows:

```ts
function printResponse(response: ApiResponse) {
  // error TS2339: Property 'data' does not exist on type 'ApiResponse'.
  if (response.data) {
    console.dir(response.data);
  }
  // error TS2339: Property 'msg' does not exist on type 'ApiResponse'.
  if (response.mgs) {
    console.log(response.msg);
  }
}
```

While using `ApiReponse` objects we need to add type guard using `in` operator as follows:

```ts
function printResponse(response: ApiReponse) {
  if ("data" in response) {
    console.dir(response.data);
  }
  if ("msg" in response) {
    console.log(response.msg);
  }
}
```

### class

While using class based objects, we need not use the `in` operator from javascript.

```ts
class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }
  loadCargo() {
    console.log("Load cargo");
  }
}

type Vehicle = Car | Truck;
```

Instead we can use the `instanceof` instead while dealing with object instances based on classes.

```ts
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo();
  }
}
```

## Discriminated Union

Consider the following example:

```ts
interface Bird {
  flyingSpeed: number;
}

interface Cat {
  movingSpeed: number;
}

type Animal = Bird | Cat;
```

Now to access the speed of a given animal instance, you could either do it as follows:

```ts
function printSpeed(animal: Animal) {
  let speed;
  if ("flyingSpeed" in animal) {
    speed = animal.flyingSpeed;
  }
  if ("movingSpeed" in animal) {
    speed = animal.movingSpeed;
  }
  console.log("Speed:", speed);
}
```

An alternative way to do the same is using type literal in the interace as follows:

```ts
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Cat {
  type: "cat";
  movingSpeed: number;
}

type Animal = Bird | Cat;

function printSpeed(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
    case "cat":
      speed = aniaml.movingSpeed;
  }
  console.log("Speed:", speed);
}
```

## Type Casting

Consider the following element on the dom:

```html
<body>
  <input type="text" id="user-input" />
</body>
```

When we access this element from javascript, we will get an error:

```ts
const element = document.querySelector("#user-input");
// error TS2339: Property 'value' does not exist on type 'Element'.
console.log(element.value);
```

If we know for sure the type of an object, we can typecast it as follows:

```ts
const element = <HTMLInputElement>document.querySelector("#user-input");
```

or

```ts
const element = document.querySelector("#user-input") as HTMLInputElement;
```

### Never Null

The exclamation mark `!` is known as the non-null assertion operator in TypeScript.

Its possible to declare that a certain object will never yeild a null value. And to do so, typescript provides us with `!`.

```ts
const element = document.querySelector("#user-input")!;
element.addEventListener("click", () => alert("element clicked"));
```

By typecasting `document.querySelector("#user-input") as HTMLInputElement` we are implicitly saying that the element will never be null. In case the element might or might not exist, its better to add explicit checks as follows:

```ts
const element = document.querySelector("#user-input");
if (element) {
  element.addEventListener("click", () => alert("element clicked"));
}
```

Note that the element will have to typecasted later instead as follows:

```ts
const element = document.querySelector("#user-input");
if (element) {
  const value = (element as HTMLInputElement).value;
  console.log(value);
}
```

## Index Properties

If you have to define an object that might or might not have some properties say as follows:

```ts
interface ErrorContainer {
  email?: string;
  username?: string;
}
```

If you do not want null for missing properties, you can use index properties as follows:

```ts
interface ErrorContainer {
  [prop: string]: string;
}
```

Then you could define your object as follows:

```ts
const errorDetails: ErrorContainer = {
  email: "enter a valid email id",
};
```

## Function Overloads

```ts
type Combinable = string | number;

function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: string, y: number): string;
function add(x: number, y: string): string;
function add(x: Combinable, y: Combinable) {
  // following is a type guard
  if (x === "string" || y === "string") {
    return x.toString() + y.toString();
  }
  return x + y;
}
```

Without overloads the `function add(x: Combinable, y: Combinable)` might return a string or number. Having function overloads can help typescript let us know what is the correct return type based on the input.

```ts
let value;
value = add("one", "two");
// This would result into error without proper overloads
value.split("");
```

## Optional Chaining

## Nullish Coalesing

Useful when you are dealing with `null` or `undefined` values.

If you use OR operator, it considers `''` and `0` as falsy values. But in case you need to consider them as valid value and consider only `null` and `undefined` differently, you have to use nullish coalesing.

```ts
let value;
value = "" || "test";
console.log(value); // test

value = "" ?? "test";
console.log(value); // ''

value = 0 || "test";
console.log(value); // test

value = 0 ?? "test";
console.log(value); // 0
```

# Generics

## Array Types

Consider the following array:

```ts
const list = ["hello", "world"];
```

Typescript can deduce the type of the array implicitly as `string[]` based on the values of the array.

To declare the type of the array you can either declare it as:

```ts
const list: string[] = [];
```

or you could declare it as follows:

```ts
const list: Array<string> = [];
```

If the array allows multiple types you could declare it as:

```ts
const list: (string | number)[] = [];
```

or

```ts
const list: Array<string | number> = [];
```

## Promises

Every promise resolve to a value of certain type. By default a Promise is of type `Promise<unknown>`. But to get the type based benefits like autocomplete or type checks, you can define the type as follows:

```ts
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resulting value");
  });
});

promise.then((data) => {
  data.split(" "); // will work as the promise return a string.
});
```

## Function Input Type

Consider the following. Even though the resulting type after assigning is a combined object, typescript would stil consider it as an any object type. So its equivalent to `function merge(x: any, y: any): any`:

```ts
function merge(x, y) {
  return Object.assign(x, y);
}
const result = merge({ name: "john" }, { age: 10 });
result.fullname; // will not result in error at compile time
```

With the types, typescript can infer that resulting object will be an intersection of passed in objects.

```ts
function merge<T, V>(x: T, y: V) {
  return Object.assign(x, y);
}

const result = merge({ name: "john" }, { age: 10 });
result.fullname; // Property 'fullname' does not exist
```

### Constraints

But when you invoke the `merge` function it can take any type as input. Consider the following example where the second argument is a `number` instead of an `object`.

```ts
const result = merge({ name: "john" }, 10);
```

In this case, neither typescript nor javascript throws an error and javascript would silently ignore the second argument during `assign` function invocation. This is because we are using generic type to tell javascript that any type input is considered valid.

In our case, we need to pass only `object` type as input to merge function. So, we should declare the generic types with constraints as follows:

```ts
function merge<T extends object, V extends object>(x: T, y: V) {
  return Object.assign(x, y);
}

// Argument of type 'number' is not assignable to parameter of type 'object'. ts(2345)
const result = merge({ name: "john" }, 10);
```

### Another generic function

```ts
interface Lengthy {
  length: number;
}

function count<T extends Lengthy>(element: T): number {
  return element.length;
}

count([]); // 0
count(["one"]); // 1
count(["one", "two"]); // 2
count("hello world"); // 11
// Argument of type 'number' is not assignable to parameter of type 'Lengthy'. ts(2345)
count(10);
```

## keyof Contraint

Consider the following example:

```ts
function getAttributeValue<T, U>(obj: T, key: U) {
  // Type 'U' cannot be used to index type 'T'. ts(2536)
  return obj[key];
}
```

Here the key that we are passing might or might not exist in the object. With typescript we can ensure that the value we are passing as key is the key in the object being passed as first parameter.

```ts
function getAttributeValue<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}
```

With the above function declaration:

```ts
getAttributeValue({ name: "john" }, "name"); // works
// Argument of type '"age"' is not assignable to parameter of type '"name"'. ts(2345)
getAttributeValue({ name: "john" }, "age");
```

## Generic Utility Types

### Partial

If you were to define a object based on a type as follows:

```ts
type Person = {
  name: string;
  age: number;
  city: string;
};

function constructObject(): Person {
  // Type '{}' is missing the following properties from type 'Person': name, age, city ts(2739)
  const person: Person = {};
  person.name = "John";
  person.age = 21;
  person.city = "Bangalore";
  return person;
}
```

Typescript doesnt like this as the initial declartion `const person: Person = {}` does not define all the properties. If you would like to add properties one by one, you can use the `Partial` type as follows:

```ts
function constructObject(): Person {
  const person: Partial<Person> = {};
  person.name = "John";
  person.age = 21;
  person.city = "Bangalore";
  return person as Person;
}
```

### Readonly

If you were to define a object that you dont want to change later, you could use the `Readonly` type as follows:

```ts
const list: Readonly<string[]> = ["one", "two"];
// error TS2339: Property 'push' does not exist on type 'readonly string[]'
list.push("try");
// error TS2339: Property 'pop' does not exist on type 'readonly string[]'.
list.pop();
```

## Generic Types vs Union Types

Consider the following example that uses Union Types:

```ts
class LargeList {
  private list: (string | boolean | number)[] = [];

  add(item: string | boolean | number) {
    this.list.push(item);
  }
}

const largeList = new LargeList();
largeList.add("one");
largeList.add(2);
largeList.add(true);
```

The above declaration makes the class work with mixed data types. It like declaring that we can have any of the type as declared in the tuple `string | boolean | number` while declaring the `list` attribute.

To declare that the given class should work with a given type, we can use generics instead of Union types.

```ts
class LargeList<T> {
  private list: T[] = [];

  add(item: T) {
    this.list.push(item);
  }
}

const largeList = new LargeList<string>();
largeList.add("one");
// error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
largeList.add(2);
// error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string'.
largeList.add(true);
```

We could add constraints on types that we want to work with `class LargeList<T extends string | number | boolean> {`

# Decorators (Meta Programming)

Decorators run when your class is defined not when its instanciated. Consider the following class with `Logger` decorator.

```ts
function Logger(constructor: Function) {
  console.log("Logger started");
  console.log(constructor);
}

@Logger
class Person {
  constructor() {
    console.log("Person constructor called");
  }
}
```

The above declaration will always print `Logger started` and `constructor` value whether `Person` class instance is created or not.

NOTE: This required `"experimentalDecorators": true` to be added to `tsconfig.json` file.

## Decorator Factories

Instead of defining the decorator function, we can use factory function which can take argument when decorator is used with a class.

```ts
function Logger(logText: string) {
  return function (constructor: Function) {
    console.log(logText);
    console.log(constructor);
  };
}

@Logger("text input for logger")
class Person {
  constructor() {
    console.log("Person constructor called");
  }
}
```

## Another Decorator

We could use more useful decorator. Similar to angular we could have a decorator which manipulates the DOM template.

```ts
function WithTemplate(template: string, id: string) {
  return function (constructor: Function) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = template;
    }
  };
}

@WithTemplate("<p>custom template here</p>", "root-node")
class Panel {
  constructor() {
    console.log("Panel constructor called");
  }
}
```
