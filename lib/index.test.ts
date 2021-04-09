import { login } from "./users";
import { sendCheckContacts } from "./contacts";
import whatsapp from "./index";
import { sendMessageTemplate } from "./messages";

jest.mock("./users", () => {
  return {
    login: jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          users: [
            {
              token: "token_eyJhbGc",
              expires_after: "2021-04-16 06:52:40+00:00",
            },
          ],
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      })
    ),
  };
});

jest.mock("./contacts", () => {
  return {
    sendCheckContacts: jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          contacts: [
            {
              input: "0123434545799",
              status: "valid",
              wa_id: "62123434545799",
            },
            {
              input: "090873534523",
              status: "valid",
              wa_id: "6290873534523",
            },
          ],
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      })
    ),
  };
});

jest.mock("./messages", () => {
  return {
    sendMessageTemplate: jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          messages: [
            {
              id: "mocked response id",
            },
          ],
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      })
    ),
  };
});

test("test login user", async () => {
  const resp = await whatsapp.loginUser("http://localhost:3030", {
    username: "whatsapp_username",
    password: "whatsapp_userpassword",
  });

  const expected = {
    users: [
      {
        token: "token_eyJhbGc",
        expires_after: "2021-04-16 06:52:40+00:00",
      },
    ],
  };

  expect(login).toHaveBeenCalledTimes(1);
  expect(resp).toMatchObject(expected);
});

test("test check contacts", async () => {
  const resp = await whatsapp.checkContacts(
    "http://localhost:3030",
    "asbcsgtoken",
    ["0123434545799", "090873534523"]
  );

  const expected = {
    contacts: [
      {
        input: "0123434545799",
        status: "valid",
        wa_id: "62123434545799",
      },
      {
        input: "090873534523",
        status: "valid",
        wa_id: "6290873534523",
      },
    ],
  };

  expect(sendCheckContacts).toHaveBeenCalledTimes(1);
  expect(resp).toMatchObject(expected);
});

test("test send message template text ", async () => {
  const resp = await whatsapp.sendMessageTemplateText(
    "http://localhost:3030",
    "asbcsgtoken",
    {
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
    }
  );

  const expected = {
    messages: [
      {
        id: "mocked response id",
      },
    ],
  };

  expect(sendMessageTemplate).toHaveBeenCalledTimes(1);
  expect(resp).toMatchObject(expected);
});
