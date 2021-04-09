# **whatsapp-business-sender**

Whatsapp Business Sender is the library for sending whatsapp for business message api using node js.

## **Built With**

- [Nodejs](https://nodejs.org/en/)
- [Axios](https://github.com/axios/axios)
- [Typescript](https://www.typescriptlang.org)

## **Getting Started**

### Prerequisites

- Node.js v^14.14.37
- npm v6.14.11
- Axios v^0.21.1
- Typescript v^4.2.4

### Installing

```bash
npm install @hyperjump/whatsapp-business-sender
```

## **Libraries**

### Exposed Libraries

```
  - loginUser
  - checkContacts
  - sendMessageTemplateText
```

### Descriptions

**_loginUser_**

The method to run login-user endpoint in the Whatsapp Business API :

- baseURL : Whatsapp business api server host
- creds : Whatsapp business user credentials, consist of username and password

_usage:_

```js
import whatsapp from "whatsapp-business-sender";

const resp = await whatsapp.loginUser("<server host>", {
  username: "<whatsapp username>",
  password: "<whatsapp password>",
});
```

**_checkContacts_**

The method to run check-contacts endpoint in the Whatsapp Business API :

- baseURL : Whatsapp business api server host
- token : token from the user login
- phones : string arrays of phone number using country code

_usage:_

```js
import whatsapp from "whatsapp-business-sender";

const resp = await whatsapp.checkContacts("<server host>", "<login token>", [
  "<phone number>",
  "<phone number>",
  "<phone number>",
]);
```

**_sendMessageTemplateText_**

The method to run send-message-template-text endpoint in Whatsapp Business API :

- baseURL : Whatsapp business api server host
- token : token from the user login
- data : consist of phone number and template configurations

_usage:_

```js
import whatsapp from "whatsapp-business-sender";

const resp = await whatsapp.sendMessageTemplateText(
  "<server host>",
  "<login token>",
  {
    phone: "<phone number with country code>",
    template: {
      namespace: "<Message Template Namespace>",
      name: "<Message Template Element Name>",
      language: {
        policy: "<Message Template Language Policy>",
        code: "<Message Template Language Code>",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "<param type>",
              text: "<param value>",
            },
          ],
        },
      ],
    },
  }
);
```

## **Versioning**

v.1.0.0

initial works
