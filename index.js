/* eslint-disable no-undefined */
import type from "@unction/type"
import fromFunctorToPairs from "@unction/fromfunctortopairs"

type ReducableIteratorType = ArrayType | ObjectType | SetType | MapType
type PairFunctorType = Array<[?KeyType, ValueType]>

const universalReduce = (unction: Function): Function =>
  (initial: mixed): Function =>
    (functor: PairFunctorType): mixed =>
      functor.reduce(
          (accumulated: mixed, [key, value]: [?KeyType, ValueType]): mixed =>
            unction(accumulated)(value)(key),
          initial
        )

const reduceMapping = {
  Array: (unction: mixed => ValueType => number => mixed): Function =>
    (initial: mixed): Function =>
      (array: ArrayType): mixed =>
        universalReduce(unction)(initial)(fromFunctorToPairs(array)),
  Set: (unction: mixed => ValueType => void => SetType): Function =>
    (initial: mixed): Function =>
      (set: SetType): mixed =>
        universalReduce(unction)(initial)(fromFunctorToPairs(set)),
  Object: (unction: ObjectType => ValueType => string => ObjectType): Function =>
    (initial: mixed): Function =>
      (object: ObjectType): mixed =>
        universalReduce(unction)(initial)(fromFunctorToPairs(object)),
  Map: (unction: mixed => ValueType => KeyType => MapType): Function =>
    (initial: mixed): Function =>
      (map: MapType): mixed =>
        universalReduce(unction)(initial)(fromFunctorToPairs(map)),
  String: (unction: mixed => ValueType => KeyType => string): Function =>
    (initial: mixed): Function =>
      (string: string): mixed =>
        universalReduce(unction)(initial)(fromFunctorToPairs(string.split(""))),
}

export default function reduceWithValueKey (unction: ReducableIteratorType => ValueType => KeyType | void => mixed): Function {
  return function reduceWithValueKeyUnction (initial: mixed): Function {
    return function reduceWithValueKeyUnctionInitial (functor: ReducableIteratorType): mixed {
      if (reduceMapping[type(functor)]) {
        return reduceMapping[type(functor)](unction)(initial)(functor)
      }

      throw new Error(`reduceWithValueKey couldn't figure out how to reduce ${type(functor)}`)
    }
  }
}
