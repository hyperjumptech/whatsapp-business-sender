import { RequestConfig } from "../internal/request";
import { login } from "./index";

jest.mock("axios", () => ({
  request: jest.fn().mockImplementationOnce(() =>
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
}));

test("test login", async () => {
  const cfg: RequestConfig = {
    name: "login-user",
    path: `http://localhost:3000/v1/users/login`,
    method: "POST",
    authType: "basic",
    body: {
      username: "username",
      password: "password",
    },
  };
  const resp = await login(cfg);

  const expected = {
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
  };

  expect(resp).toMatchObject(expected);
});
