import type from "@unction/type";
import {scan} from "most";
import fromFunctorToPairs from "@unction/fromfunctortopairs";
import {ReducerFunctionType} from "./types";

export default function reduceWithValueKey<A, B, C, D, E> (reducer: ReducerFunctionType<A, B | D, C>) {
  return function reduceWithValueKeyUnction (initial: D) {
    return function reduceWithValueKeyUnctionInitial (enumerable: Array<A> | Set<A> | RecordType<unknown, A> | string): E {
      switch (type(enumerable)) {
        case "Array": {
          return enumerable.reduce((accumulated: A, value: B, key: C) => reducer(accumulated)(value)(key), initial);
        }

        case "Object": {
          return fromFunctorToPairs(enumerable).reduce((accumulated: A, [key, value]: [C, D]) => reducer(accumulated)(value)(key), initial);
        }

        case "Set": {
          return fromFunctorToPairs(enumerable).reduce((accumulated: A, [, value]: [C, D]) => reducer(accumulated)(value)(), initial);
        }

        case "Map": {
          return fromFunctorToPairs(enumerable).reduce((accumulated: A, [key, value]: [C, D]) => reducer(accumulated)(value)(key), initial);
        }

        case "Stream": {
          return scan((accumulated: A, value: B) => reducer(accumulated)(value)(), initial, enumerable);
        }

        case "String": {
          return fromFunctorToPairs(enumerable.split("")).reduce((accumulated: A, [key, value]: [C, D]) => reducer(accumulated)(value)(key), initial);
        }

        default: {
          throw new Error(`reduceWithValueKey couldn't figure out how to reduce ${type(enumerable)}`);
        }
      }
    };
  };
}
