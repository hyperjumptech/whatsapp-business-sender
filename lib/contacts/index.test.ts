import { RequestConfig } from "../internal/request";
import { sendCheckContacts } from "./index";

jest.mock("axios", () => ({
  request: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        contacts: [
          {
            phone: "message_id_eyJhbGc",
            status: "valid",
            wa_id: "6290873534523",
          },
          {
            phone: "message_id_eyJhbGc",
            status: "valid",
            wa_id: "6290634643565",
          },
          {
            phone: "message_id_eyJhbGc",
            status: "valid",
            wa_id: "6294563643634",
          },
        ],
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    })
  ),
}));

test("test check contacts", async () => {
  const cfg: RequestConfig = {
    name: "login-user",
    path: `http://localhost:3000/v1/users/login`,
    method: "POST",
    authType: "bearer",
  };

  const resp = await sendCheckContacts(cfg, "asbcsgtoken", [
    "090873534523",
    "090634643565",
    "094563643634",
  ]);

  const expected = {
    data: {
      contacts: [
        {
          phone: "message_id_eyJhbGc",
          status: "valid",
          wa_id: "6290873534523",
        },
        {
          phone: "message_id_eyJhbGc",
          status: "valid",
          wa_id: "6290634643565",
        },
        {
          phone: "message_id_eyJhbGc",
          status: "valid",
          wa_id: "6294563643634",
        },
      ],
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  };

  expect(resp).toMatchObject(expected);
});
