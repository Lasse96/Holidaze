import * as yup from "yup";
export const schema = yup
  .object({
    avatar: yup.string().url("enter URL"),
  })
  .required();
