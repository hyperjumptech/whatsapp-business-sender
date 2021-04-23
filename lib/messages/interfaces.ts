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

export interface Template {
  namespace: string;
  name: string;
  language: Language;
  components: TypeParamComponent[] | ButtonComponent[];
}

export interface Language {
  policy: string;
  code: string;
}

export interface TypeParamComponent {
  type: "header" | "body" | "button";
  parameters: any[];
}

export interface ButtonComponent {
  type: string;
  sub_type: string;
  index: number;
  parameters:
    | TypeTextParam
    | TypeTextParam[]
    | TypePayloadParam
    | TypePayloadParam[];
}

export interface TypeTextParam {
  type: string;
  text: string;
}

export interface TypePayloadParam {
  type: string;
  payload: string;
}

export interface SendMessageTemplateBody {
  to: string;
  type: string;
  template: Template;
}

export interface Data {
  phone: string;
  template: Template;
}

export interface SendMessageResponse {
  messages: [
    {
      id: string;
    }
  ];
  meta: {
    api_status: string;
    version: string;
  };
}
