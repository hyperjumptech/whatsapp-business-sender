import { authBasic, authBearer, authorize } from "./authorization";

test("test basic authentication success", () => {
  const resp = authBasic({ username: "username", password: "password" });
  expect(resp).toMatch(new RegExp(`^Basic?`));
});

test("test basic authentication empty username", () => {
  expect(() => authBasic({ username: "", password: "password" })).toThrow(
    "Username should not be empty or undefined"
  );
});

test("test basic authentication empty password", () => {
  expect(() => authBasic({ username: "username", password: "" })).toThrow(
    "Password should not be empty or undefined"
  );
});

test("test bearer authentication success", () => {
  const resp = authBearer("token");
  expect(resp).toMatch(new RegExp(`^Bearer?`));
});

test("undefined authozation", () => {
  const resp = authorize("this should return undefined", "arguments");
  expect(resp).toBeUndefined();
});
