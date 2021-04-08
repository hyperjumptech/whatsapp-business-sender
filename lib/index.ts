import { AxiosBasicCredentials } from "axios";
import { sendCheckContacts } from "./contacts";
import { RequestConfig } from "./internal/request";
import { sendMessageTemplateText } from "./messages";
import { Data } from "./messages/interfaces";
import { login } from "./users";

module.exports = {
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

    return sendMessageTemplateText(cfg, token, data)
      .then((res) => res?.data)
      .catch((err) => err);
  },
};
