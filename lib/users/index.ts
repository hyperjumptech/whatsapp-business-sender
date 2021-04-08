import axios from "axios";
import { log } from "console";
import { RequestConfig } from "../internal/request";
import { authorize } from "../internal/authorization";

export const login = async (cfg: RequestConfig) => {
  try {
    const headers = cfg.headers;
    headers["Content-Type"] = "application/json";
    headers["Authorization"] = authorize(cfg.authType, cfg.body);

    return axios.request({
      method: cfg.method,
      url: cfg.path,
      headers,
    });
  } catch (error) {
    log(`Failed when try to logged in: ${error}`);
  }
};
