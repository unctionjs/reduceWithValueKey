/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"
import xstream from "xstream"
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

test("Stream", ({equal, end}) => {
  streamSatisfies(
    "'.'---'./a:undefined'---'./a:undefined/b:undefined'---'./a:undefined/b:undefined/c:undefined'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      xstream.fromArray(["a", "b", "c"])
    )
  )
})

test("MemoryStream", ({equal, end}) => {
  streamSatisfies(
    "'.'---'./a:undefined'---'./a:undefined/b:undefined'---'./a:undefined/b:undefined/c:undefined'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    () => () => end()
  )(
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      xstream.fromArray(["a", "b", "c"]).remember()
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
