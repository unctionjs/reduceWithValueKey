/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"

import reduceWithValueKey from "./index"

test(({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (current) =>
          (key) =>
            `${accumulation}/${current}:${key}`
    )(
      "."
    )(
      ["a", "b", "c"]
    ),
    "./a:0/b:1/c:2"
  )

  end()
})

test(({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (current) =>
          (key) =>
            `${accumulation}/${current}:${key}`
    )(
      "."
    )(
      {
        aaa: "a",
        bbb: "b",
        ccc: "c",
      }
    ),
    "./a:aaa/b:bbb/c:ccc"
  )

  end()
})

test(({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (current) =>
          (key) =>
            `${accumulation}/${current}:${key}`
    )(
      "."
    )(
      new Set(["a", "b", "c"])
    ),
    "./a:undefined/b:undefined/c:undefined"
  )

  end()
})

test(({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (current) =>
          (key) =>
            `${accumulation}/${current}:${key}`
    )(
      "."
    )(
      new Map([["aaa", "a"], ["bbb", "b"], ["ccc", "c"]])
    ),
    "./a:aaa/b:bbb/c:ccc"
  )

  end()
})

test(({throws, end}) => {
  throws(
    () =>
      reduceWithValueKey(
        (accumulation) =>
          (current) =>
            (key) =>
              `${accumulation}/${current}:${key}`
      )(
        "."
      )(
        true
      ),
      "./a:aaa/b:bbb/c:ccc"
  )

  end()
})

test(({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (current) =>
          (key) =>
            `${accumulation}/${current}:${key}`
    )(
      "."
    )(
      "abc"
    ),
    "./a:0/b:1/c:2"
  )

  end()
})
