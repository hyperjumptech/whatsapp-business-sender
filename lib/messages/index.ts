import { Data } from "./interfaces";
import { RequestConfig } from "../internal/request";
import { authorize } from "../internal/authorization";
import { SendMessageTemplateBody } from "./interfaces";
import { log } from "console";
import axios from "axios";

export const sendMessageTemplate = async (
  cfg: RequestConfig,
  token: string,
  data: Data
) => {
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

    log(`--- success sending message: ${resp.config.data}`);
    return resp;
  } catch (error) {
    log("--- failed to send message: ", error.message);
    throw new Error(`failed to send message with error: ${error.message}`);
  }
};
