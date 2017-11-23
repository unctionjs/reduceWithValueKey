import type from "@unction/type"
import fromFunctorToPairs from "@unction/fromfunctortopairs"

import type {FunctorType} from "types"
import type {ArrayType} from "types"
import type {ObjectType} from "types"
import type {SetType} from "types"
import type {MapType} from "types"
import type {StreamType} from "types"
import type {ValueType} from "types"
import type {ArrayKeyType} from "types"
import type {ObjectKeyType} from "types"
import type {MapKeyType} from "types"
import type {ReducerFunctionType} from "types"
import type {UnaryFunctionType} from "types"

const arrayReduce: UnaryFunctionType = (unction: ReducerFunctionType): UnaryFunctionType =>
  (initial: mixed): UnaryFunctionType =>
    (array: ArrayType): mixed =>
      array.reduce(
        (accumulated: mixed, value: ValueType, key: ArrayKeyType): mixed =>
          unction(accumulated)(value)(key),
        initial
      )
const setReduce: UnaryFunctionType = (unction: ReducerFunctionType): UnaryFunctionType =>
  (initial: mixed): UnaryFunctionType =>
    (set: SetType): mixed =>
      fromFunctorToPairs(set).reduce(
        (accumulated: mixed, [key, value]: [null, ValueType]): mixed =>
          unction(accumulated)(value)(key),
        initial
      )
const objectReduce: UnaryFunctionType = (unction: ReducerFunctionType): UnaryFunctionType =>
  (initial: mixed): UnaryFunctionType =>
    (object: ObjectType): mixed =>
      fromFunctorToPairs(object).reduce(
        (accumulated: mixed, [key, value]: [ObjectKeyType, ValueType]): mixed =>
          unction(accumulated)(value)(key),
        initial
      )
const mapReduce: UnaryFunctionType = (unction: ReducerFunctionType): UnaryFunctionType =>
  (initial: mixed): UnaryFunctionType =>
    (map: MapType): mixed =>
      fromFunctorToPairs(map).reduce(
        (accumulated: mixed, [key, value]: [MapKeyType, ValueType]): mixed =>
          unction(accumulated)(value)(key),
        initial
      )
const streamReduce: UnaryFunctionType = (unction: ReducerFunctionType): UnaryFunctionType =>
  (initial: mixed): UnaryFunctionType =>
    (stream: StreamType): mixed =>
      stream.fold(
        (accumulated: mixed, value: ValueType): mixed =>
          unction(accumulated)(value)(null),
        initial
      )
const stringReduce: UnaryFunctionType = (unction: ReducerFunctionType): UnaryFunctionType =>
  (initial: mixed): UnaryFunctionType =>
    (string: StringType): mixed =>
      fromFunctorToPairs(string.split("")).reduce(
        (accumulated: mixed, [key, value]: [ArrayKeyType, StringType]): mixed =>
          unction(accumulated)(value)(key),
        initial
      )

export default function reduceWithValueKey (reducer: ReduceFunctionType): UnaryFunctionType {
  return function reduceWithValueKeyUnction (initial: mixed): UnaryFunctionType {
    return function reduceWithValueKeyUnctionInitial (functor: FunctorType): mixed {
      switch (type(functor)) {
        case "Array": {
          return arrayReduce(reducer)(initial)(functor)
        }
        case "Object": {
          return objectReduce(reducer)(initial)(functor)
        }
        case "Set": {
          return setReduce(reducer)(initial)(functor)
        }
        case "Map": {
          return mapReduce(reducer)(initial)(functor)
        }
        case "Stream":
        case "MemoryStream": {
          return streamReduce(reducer)(initial)(functor)
        }
        case "String": {
          return stringReduce(reducer)(initial)(functor)
        }
        default: {
          throw new Error(`reduceWithValueKey couldn't figure out how to reduce ${type(functor)}`)
        }
      }
    }
  }
}
