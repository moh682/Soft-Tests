package test.src.main.java.test;

import test.src.main.java.test.Action;

public class FooTest {

  public void testFoo() {
    String foo = "Foo";
    String result = foo.toUpperCase();
    Action.assertEquals("Result should be upper case", result, "FOO");
    Action.assertEquals("Length should not differ", result.length(), foo.length());
  }

  public void testBar() {
    System.out.println("Bar");
  }
}