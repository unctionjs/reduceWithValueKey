
import {from} from "most";
import streamSatisfies from "@unction/streamsatisfies";

import reduceWithValueKey from "./index.ts";

test("Array", () => {
  expect(reduceWithValueKey(
    (accumulation) =>
      (value) =>
        (key) =>
          `${accumulation}/${value}:${key}`
  )(
    "."
  )(
    ["a", "b", "c"]
  )).toBe("./a:0/b:1/c:2");
});

test("Object", () => {
  expect(reduceWithValueKey(
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
  )).toBe("./a:aaa/b:bbb/c:ccc");
});

test("Set", () => {
  expect(reduceWithValueKey(
    (accumulation) =>
      (value) =>
        (key) =>
          `${accumulation}/${value}:${key}`
  )(
    "."
  )(
    new Set(["a", "b", "c"])
  )).toBe("./a:undefined/b:undefined/c:undefined");
});

test("Map", () => {
  expect(reduceWithValueKey(
    (accumulation) =>
      (value) =>
        (key) =>
          `${accumulation}/${value}:${key}`
  )(
    "."
  )(
    new Map([["aaa", "a"], ["bbb", "b"], ["ccc", "c"]])
  )).toBe("./a:aaa/b:bbb/c:ccc");
});

test("Stream", done => {
  streamSatisfies(
    [
      ".",
      "./a:undefined",
      "./a:undefined/b:undefined",
      "./a:undefined/b:undefined/c:undefined",
    ]
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      expect(length).toBe(size);

      done();
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
  );
});

test("String", () => {
  expect(reduceWithValueKey(
    (accumulation) =>
      (value) =>
        (key) =>
          `${accumulation}/${value}:${key}`
  )(
    "."
  )(
    "abc"
  )).toBe("./a:0/b:1/c:2");
});

test("error", () => {
  expect(() =>
    reduceWithValueKey(
      (accumulation) =>
        (value) =>
          (key) =>
            `${accumulation}/${value}:${key}`
    )(
      "."
    )(
      true
    )).toThrow();
});
