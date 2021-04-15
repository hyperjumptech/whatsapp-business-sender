/**********************************************************************************
 * MIT License                                                                    *
 *                                                                                *
 * Copyright (c) 2021 Hyperjump Technology                                        *
 *                                                                                *
 * Permission is hereby granted, free of charge, to any person obtaining a copy   *
 * of this software and associated documentation files (the "Software"), to deal  *
 * in the Software without restriction, including without limitation the rights   *
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell      *
 * copies of the Software, and to permit persons to whom the Software is          *
 * furnished to do so, subject to the following conditions:                       *
 *                                                                                *
 * The above copyright notice and this permission notice shall be included in all *
 * copies or substantial portions of the Software.                                *
 *                                                                                *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR     *
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,       *
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE    *
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER         *
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  *
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  *
 * SOFTWARE.                                                                      *
 **********************************************************************************/

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
