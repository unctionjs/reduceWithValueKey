/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"
import {from} from "most"
import streamSatisfies from "@unction/streamsatisfies"

import reduceWithValueKey from "./index"

test("Array", ({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      ["a", "b", "c"]
    ),
    "./a:0/b:1/c:2"
  )

  end()
})

test("Object", ({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
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

test("Set", ({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      new Set(["a", "b", "c"])
    ),
    "./a:undefined/b:undefined/c:undefined"
  )

  end()
})

test("Map", ({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      new Map([["aaa", "a"], ["bbb", "b"], ["ccc", "c"]])
    ),
    "./a:aaa/b:bbb/c:ccc"
  )

  end()
})

test("Stream", ({equal, doesNotThrow, end}) => {
  streamSatisfies(
    [
      ".",
      "./a:undefined",
      "./a:undefined/b:undefined",
      "./a:undefined/b:undefined/c:undefined",
    ]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      from(["a", "b", "c"])
    )
  )
})

test("String", ({equal, end}) => {
  equal(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      "abc"
    ),
    "./a:0/b:1/c:2"
  )

  end()
})

test("error", ({throws, end}) => {
  throws(
    () =>
      reduceWithValueKey(
        (accumulation) =>
          (value) =>
            (key) =>
              `${accumulation}/${value}:${key}`
      )(
        "."
      )(
        true
      ),
    "./a:aaa/b:bbb/c:ccc"
  )

  end()
})
