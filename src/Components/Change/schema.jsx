import * as yup from "yup";
export const schema = yup
  .object({
    name: yup.string().required("enter venue"),
    media: yup
      .array()
      .of(
        yup
          .string()
          .required("add image")
          .url("enter url")
      ),
    description: yup.string().required("enter description"),
    price: yup
      .number(0)
      .required()
      .default(0, "enter number"),

    maxGuests: yup
      .number(0)
      .required(),
    meta: yup.object().shape({
      breakfast: yup.boolean(),
      wifi: yup.boolean(),
      pets: yup.boolean(),
      parking: yup.boolean(),
    }),
  })
  .required();
