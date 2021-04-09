import axios from "axios";
import { CheckContactRequestBody } from "./interfaces";
import { RequestConfig } from "../internal/request";
import { authorize } from "../internal/authorization";
import { log } from "console";

export const sendCheckContacts = async (
  cfg: RequestConfig,
  token: string,
  phones: string[]
) => {
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
    log(`Failed when checking contacts: ${error}`);
  }
};
