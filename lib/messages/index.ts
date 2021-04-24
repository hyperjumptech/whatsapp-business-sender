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

import { Data, SendMessageResponse } from "./interfaces";
import { RequestConfig } from "../internal/request";
import { authorize } from "../internal/authorization";
import { SendMessageTemplateBody } from "./interfaces";
import logger from "../internal/logger";
import axios, { AxiosResponse } from "axios";

export const sendMessageTemplate = async (
  cfg: RequestConfig,
  token: string,
  data: Data
): Promise<AxiosResponse<SendMessageResponse>> => {
  const headers = {};
  headers["Content-Type"] = "application/json";
  headers["Authorization"] = authorize(cfg.authType, token);

  const body: SendMessageTemplateBody = {
    to: data.phone,
    type: "template",
    template: {
      namespace: data.template.namespace,
      name: data.template.name,
      language: data.template.language,
      components: data.template.components,
    },
  };

  try {
    const resp = await axios.request({
      method: cfg.method,
      url: cfg.path,
      headers,
      data: body,
      timeout: 30000,
    });

    logger.info(`Success sending message: ${resp.config.data}`);
    return resp;
  } catch (error) {
    logger.error(`Failed to send message: ${error}`);
    throw error;
  }
};
