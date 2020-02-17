package test.src.main.java.test;

public class Action {
  public static void assertEquals(String message, Object actual, Object expected) {
    if (actual != null && actual.equals(expected) || actual == expected)
      return;
    throw new AssertionException(message, actual, expected);
  }
}