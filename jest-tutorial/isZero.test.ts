import { isZero } from "./isZero";

it("0を渡したらtureになること", () => {
  const result = isZero(0);
  expect(result).toBe(true);
});

it("1を渡したらfalseになること", () => {
  const result = isZero(1);
  expect(result).toBe(false);
});
