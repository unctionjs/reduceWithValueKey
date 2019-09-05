# @unction/reduceWithValueKey

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ReducerFunctionType<A, B | D, C> => D => EnumerableType<A> => E

Reduces over a functor, providing the reducer with the value and key.

``` javascript
reduceWithValueKey(
  (accumulation) => (current) => (key) => `${accumulation}/${current}:${key}`
)(
  "~"
)(
  ["Users", "krainboltgreene", "Code"]
)
```

Which will return:

``` javascript
"~/Users:0/krainboltgreene:1/Code:2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/reduceWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/reduceWithValueKey.svg?maxAge=2592000&style=flat-square
