import {cleanInput} from './../src/repl';
import {describe, expect, test} from 'vitest';

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  }, {
    input: "  Ahmad  Qadri  ",
    expected: ["ahmad", "qadri"],
  }, {
    input: "  123  BIG  ",
    expected: ["123", "big"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    let actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
