import * as yup from "yup";
const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:stud\.)?noroff\.no$/;
export const schema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, "Must be a valid email")
      .required("enter email"),
    password: yup
      .string()
      .min(8, "Minimum 8 characters")
      .required("Minimum 8 characters"),
  })
  .required();
