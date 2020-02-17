import { FooTest } from "./FooTest";
import { red, green } from "colors";

class Runner {
  c = undefined;

  public constructor(c: any) {
    this.c = c;
  }

  public run(): void {
    const CLASS: any = this.c;
    let error: boolean = false;
    for (const key in CLASS) {
      if (/test/.test(key) && typeof CLASS[key] === 'function') {
        try {
          console.log(key);
          CLASS[key]();
        } catch (exception) {
          error = true;
          console.log(red(exception.message))
        }
        console.log('----------------------');
      }
    }
    if (!error) console.log(green('method is working'))
  }
}

const r = new Runner(new FooTest());
r.run();