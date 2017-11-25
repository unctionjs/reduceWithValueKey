import type from "@unction/type"
import fromFunctorToPairs from "@unction/fromfunctortopairs"

import type {FunctorType} from "types"
import type {ValueType} from "types"
import type {ArrayKeyType} from "types"
import type {ObjectKeyType} from "types"
import type {MapKeyType} from "types"
import type {ReducerFunctionType} from "types"
import type {UnaryFunctionType} from "types"

export default function reduceWithValueKey (reducer: ReducerFunctionType): UnaryFunctionType {
  return function reduceWithValueKeyUnction (initial: mixed): UnaryFunctionType {
    return function reduceWithValueKeyUnctionInitial (functor: FunctorType): mixed {
      switch (type(functor)) {
        case "Array": {
          return functor.reduce(
            (accumulated: mixed, value: ValueType, key: ArrayKeyType): mixed =>
              reducer(accumulated)(value)(key),
            initial
          )
        }
        case "Object": {
          return fromFunctorToPairs(functor).reduce(
            (accumulated: mixed, [key, value]: [ObjectKeyType, ValueType]): mixed =>
              reducer(accumulated)(value)(key),
            initial
          )
        }
        case "Set": {
          return fromFunctorToPairs(functor).reduce(
            (accumulated: mixed, [, value]: [null, ValueType]): mixed =>
              reducer(accumulated)(value)(),
            initial
          )
        }
        case "Map": {
          return fromFunctorToPairs(functor).reduce(
            (accumulated: mixed, [key, value]: [MapKeyType, ValueType]): mixed =>
              reducer(accumulated)(value)(key),
            initial
          )
        }
        case "Stream": {
          return functor.fold(
            (accumulated: mixed, value: ValueType): mixed =>
              reducer(accumulated)(value)(),
            initial
          )
        }
        case "MemoryStream": {
          return functor.fold(
            (accumulated: mixed, value: ValueType): mixed =>
              reducer(accumulated)(value)(),
            initial
          )
        }
        case "String": {
          return fromFunctorToPairs(functor.split("")).reduce(
            (accumulated: mixed, [key, value]: [ArrayKeyType, StringType]): mixed =>
              reducer(accumulated)(value)(key),
            initial
          )
        }
        default: {
          throw new Error(`reduceWithValueKey couldn't figure out how to reduce ${type(functor)}`)
        }
      }
    }
  }
}
