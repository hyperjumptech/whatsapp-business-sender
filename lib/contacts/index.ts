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

import axios, { AxiosResponse } from "axios";
import { CheckContactRequestBody, CheckContactResponse } from "./interfaces";
import { RequestConfig } from "../internal/request";
import { authorize } from "../internal/authorization";
import logger from "../internal/logger";

export const sendCheckContacts = async (
  cfg: RequestConfig,
  token: string,
  phones: string[]
): Promise<AxiosResponse<CheckContactResponse>> => {
  try {
    const headers = {};
    headers["Content-Type"] = "application/json";
    headers["Authorization"] = authorize(cfg.authType, token);

    const body: CheckContactRequestBody = {
      blocking: "wait",
      contacts: phones,
      force_check: false,
    };

    return axios.request({
      method: cfg.method,
      url: cfg.path,
      headers: headers,
      data: body,
    });
  } catch (error) {
    logger.error(`Failed when checking contacts: ${error}`);
  }
};
