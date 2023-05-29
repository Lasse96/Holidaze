import * as yup from "yup";

export const schema = yup.object({
  dateFrom: yup.date().min(new Date(), "Different date"),
  dateTo: yup.date().min(yup.ref("dateForm"), "Different date"),
  guests: yup
    .number()
    .required("add guests")
});
