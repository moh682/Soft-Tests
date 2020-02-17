import { green, red } from 'colors'
import { AssertionException } from './AssertionException'

export class Actions {
  public static assertEquals = (message: string, actual: Object, expected: Object): void => {
    if (actual !== expected) throw new AssertionException(actual, expected, message);
  }
}