import type from "@unction/type";
import {scan} from "most";
import fromFunctorToPairs from "@unction/fromfunctortopairs";
export default function reduceWithValueKey (reducer) {
  return function reduceWithValueKeyUnction (initial) {
    return function reduceWithValueKeyUnctionInitial (functor) {
      switch (type(functor)) {
        case "Array":
        {
          return functor.reduce((accumulated, value, key) => reducer(accumulated)(value)(key), initial);
        }

        case "Object":
        {
          return fromFunctorToPairs(functor).reduce((accumulated, [key, value]) => reducer(accumulated)(value)(key), initial);
        }

        case "Set":
        {
          return fromFunctorToPairs(functor).reduce((accumulated, [, value]) => reducer(accumulated)(value)(), initial);
        }

        case "Map":
        {
          return fromFunctorToPairs(functor).reduce((accumulated, [key, value]) => reducer(accumulated)(value)(key), initial);
        }

        case "Stream":
        {
          return scan((accumulated, value) => reducer(accumulated)(value)(), initial, functor);
        }

        case "String":
        {
          return fromFunctorToPairs(functor.split("")).reduce((accumulated, [key, value]) => reducer(accumulated)(value)(key), initial);
        }

        default:
        {
          throw new Error(`reduceWithValueKey couldn't figure out how to reduce ${type(functor)}`);
        }
      }
    };
  };
}
