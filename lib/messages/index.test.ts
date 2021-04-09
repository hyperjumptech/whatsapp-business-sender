import { RequestConfig } from "../internal/request";
import { sendMessageTemplate } from "./index";

jest.mock("axios", () => ({
  request: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        messages: [
          {
            id: "message_id_eyJhbGc",
          },
        ],
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        data: "sent data",
      },
    })
  ),
}));

test("test send message", async () => {
  const cfg: RequestConfig = {
    name: "login-user",
    path: `http://localhost:3000/v1/users/login`,
    method: "POST",
    authType: "bearer",
  };

  const resp = await sendMessageTemplate(cfg, "asbcsgtoken", {
    phone: "6290873534523",
    template: {
      namespace: "template_namespace",
      name: "template_name",
      language: {
        policy: "language_policy",
        code: "language_code",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "param",
            },
          ],
        },
      ],
    },
  });

  const expected = {
    data: {
      messages: [
        {
          id: "message_id_eyJhbGc",
        },
      ],
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      data: "sent data",
    },
  };

  expect(resp).toMatchObject(expected);
});
