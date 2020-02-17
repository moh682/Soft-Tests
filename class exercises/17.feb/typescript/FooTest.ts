import { Actions } from "./Action";

export class FooTest {

  test = "2";

  public testFoo = (): void => {
    const foo = 'Foo';
    const result = foo.toUpperCase();
    Actions.assertEquals(result + ' is not Foo', result, 'Foo');
    Actions.assertEquals('length should not differ', result.length, 4);
  }

  public foo = (): void => {
    const foo = 'Foo';
    const result = foo.toUpperCase();
    Actions.assertEquals(result + ' is not Foo', result, 'Foo');
    Actions.assertEquals('length should not differ', result.length, 4);
  }

  public testBar = (): void => { }

  public testFail = (): void => {
    Actions.assertEquals('asd', func(2), 10);
  }
}

const func = (n: number) => {
  return n
}