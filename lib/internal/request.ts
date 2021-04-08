import { AxiosRequestConfig } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  name: "login-user" | "check-contact" | "send-message-template-text";
  path: string;
  body?: any;
  authType: "basic" | "bearer";
}
