import * as yup from "yup";
const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:stud\.)?noroff\.no$/;
const nameRegex = /^[a-zA-Z0-9_]*$/;
export const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Minimum 3 characters")
      .matches(
        nameRegex,
        "Minimum 3 characters"
      )
      .required("enter username"),
    email: yup
      .string()
      .matches(emailRegex, "Must be a valid email")
      .required("enter email"),
    avatar: yup.string().url("enter url"),
    password: yup
      .string()
      .min(8, "Minimum 8 characters")
      .required("Minimum 8 characters"),
    venueManager: yup.boolean(),
  })
  .required();
