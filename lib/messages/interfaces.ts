export interface Template {
  namespace: string;
  name: string;
  language: Language;
  components: TypeParamComponent[] | ButtonComponent[];
}

export interface Language {
  policy: string;
  code: string;
}

export interface TypeParamComponent {
  type: "header" | "body" | "button";
  parameters: any[];
}

export interface ButtonComponent {
  type: string;
  sub_type: string;
  index: number;
  parameters:
    | TypeTextParam
    | TypeTextParam[]
    | TypePayloadParam
    | TypePayloadParam[];
}

export interface TypeTextParam {
  type: string;
  text: string;
}

export interface TypePayloadParam {
  type: string;
  payload: string;
}

export interface SendMessageTemplateBody {
  to: string;
  type: string;
  template: Template;
}

export interface Data {
  phone: string;
  template: Template;
}
