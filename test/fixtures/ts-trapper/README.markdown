# TypeScript Type-Wrapper [![(npm)](https://img.shields.io/npm/v/ts-trapper.svg)](https://npmjs.com/package/ts-trapper)

A tiny module that gives you the `typeWrapper` class constructor + static methods bundle, for quick definition of type wrappers.


## What are Type Wrappers?

A way of declaring a new type, that is simply a wrapper around another type, to make mix-ups easier to prevent.

For example, declaring a wrapper around `string` called `UserID`, to stop User IDs from being mixed up with other strings (like usernames or descriptions).

This is elaborated on [in this blog post](http://robhoward.id.au/blog/2017/01/effective-types-a-parameterised-type-primer-flow/) (TypeScript-specific version to come).


## Usage

```js
import { typeWrapper } from 'ts-trapper';

// Declare a new type wrapper:
class UserID extends typeWrapper<UserID,number>() {
  private brand: any;  
}

// Number -> UserID-wrapped Number
const id = UserID.wrap(123);

// 💥 Can't use like a number without unwrapping.
const wrong1 = id * 55;

// 💥 Can't use it like another wrapped type.
const wrong2 = CompanyID.unwrap(id);

function greet(userId: UserID, name: string): string {
  // UserID-wrapped Number -> Number
  const userIdNumber = UserID.unwrap(userId);

  // Unwrapped; fine to use now.
  return "User #" + userIdNumber + ": " + name;
}

console.log(greet(id, "Bert"));
```

See the `examples/` directory for more.

Inspired by [@giuliocanti](https://github.com/)'s original "class constructor" pattern from [this TS Playground example](https://twitter.com/GiulioCanti/status/827856104096989184).
