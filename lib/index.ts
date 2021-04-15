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

import { AxiosBasicCredentials } from "axios";
import { sendCheckContacts } from "./contacts";
import { RequestConfig } from "./internal/request";
import { sendMessageTemplate } from "./messages";
import { Data } from "./messages/interfaces";
import { login } from "./users";

export = {
  loginUser: async (baseURL: string, creds: AxiosBasicCredentials) => {
    const cfg: RequestConfig = {
      name: "login-user",
      path: `${baseURL}/v1/users/login`,
      method: "POST",
      authType: "basic",
      body: creds,
    };

    return login(cfg)
      .then((res) => res?.data)
      .catch((err) => err);
  },
  checkContacts: async (baseURL: string, token: string, phones: string[]) => {
    const cfg: RequestConfig = {
      name: "check-contact",
      path: `${baseURL}/v1/contacts`,
      method: "POST",
      authType: "bearer",
      body: "",
    };

    return sendCheckContacts(cfg, token, phones)
      .then((res) => res?.data)
      .catch((err) => err);
  },
  sendMessageTemplateText: async (
    baseURL: string,
    token: string,
    data: Data
  ) => {
    const cfg: RequestConfig = {
      name: "send-message-template-text",
      path: `${baseURL}/v1/messages`,
      method: "POST",
      authType: "bearer",
      body: "",
    };

    return sendMessageTemplate(cfg, token, data)
      .then((res) => res?.data)
      .catch((err) => err);
  },
};
