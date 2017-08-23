/* eslint-disable no-undefined */
import type from "@unction/type"
import fromFunctorToPairs from "@unction/fromfunctortopairs"

type ReducableIteratorType = ArrayType | ObjectType | SetType | MapType

const reduceMapping = {
  Array: (unction: ArrayType => ValueType => number => mixed): Function =>
    (initial: ArrayType): Function =>
      (array: ArrayType): mixed =>
        fromFunctorToPairs(array)
          .reduce(
            (accumulated: ArrayType, [key, value]: [number, ValueType]): mixed =>
              unction(accumulated)(value)(key),
            initial
          ),
  Set: (unction: SetType => ValueType => KeyType => SetType): Function =>
    (initial: SetType): Function =>
      (set: SetType): mixed =>
        fromFunctorToPairs(set)
          .reduce(
            (accumulated: SetType, [key, value]: [void, ValueType]): mixed =>
              unction(accumulated)(value)(key),
            initial
          ),
  Object: (unction: ObjectType => ValueType => KeyType => ObjectType): Function =>
    (initial: ObjectType): Function =>
      (object: ObjectType): mixed =>
        fromFunctorToPairs(object)
          .reduce(
            (accumulated: ObjectType, [key, value]: [KeyType, ValueType]): mixed =>
              unction(accumulated)(value)(key),
            initial
          ),
  Map: (unction: MapType => ValueType => KeyType => MapType): Function =>
    (initial: MapType): Function =>
      (map: MapType): mixed =>
        fromFunctorToPairs(map)
          .reduce(
            (accumulated: MapType, [key, value]: [KeyType, ValueType]): mixed =>
              unction(accumulated)(value)(key),
            initial
          ),
}

export default function reduceWithValueKey (unction: ReducableIteratorType => ValueType => KeyType | void => mixed): Function {
  return function reduceWithValueKeyUnction (initial: mixed): Function {
    return function reduceWithValueKeyUnctionInitial (iterable: ReducableIteratorType): mixed {
      if (reduceMapping[type(iterable)]) {
        return reduceMapping[type(iterable)](unction)(initial)(iterable)
      }

      throw new Error(`reduceWithValueKey couldn't figure out how to reduce ${type(iterable)}`)
    }
  }
}
