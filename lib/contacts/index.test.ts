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

import { RequestConfig } from "../internal/request";
import { sendCheckContacts } from "./index";

jest.mock("axios", () => ({
  request: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        contacts: [
          {
            phone: "message_id_eyJhbGc",
            status: "valid",
            wa_id: "6290873534523",
          },
          {
            phone: "message_id_eyJhbGc",
            status: "valid",
            wa_id: "6290634643565",
          },
          {
            phone: "message_id_eyJhbGc",
            status: "valid",
            wa_id: "6294563643634",
          },
        ],
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    })
  ),
}));

test("test check contacts", async () => {
  const cfg: RequestConfig = {
    name: "login-user",
    path: `http://localhost:3000/v1/users/login`,
    method: "POST",
    authType: "bearer",
  };

  const resp = await sendCheckContacts(cfg, "asbcsgtoken", [
    "090873534523",
    "090634643565",
    "094563643634",
  ]);

  const expected = {
    data: {
      contacts: [
        {
          phone: "message_id_eyJhbGc",
          status: "valid",
          wa_id: "6290873534523",
        },
        {
          phone: "message_id_eyJhbGc",
          status: "valid",
          wa_id: "6290634643565",
        },
        {
          phone: "message_id_eyJhbGc",
          status: "valid",
          wa_id: "6294563643634",
        },
      ],
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  };

  expect(resp).toMatchObject(expected);
});
