//schema for our form
import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Please Enter Your Name")
    .min(4, "Name must be 4 characters long"),

  password: yup
    .string()
    .trim()
    .required("Please Enter A Password"),

  email: yup
    .string()
    .trim()
    .required("Please Enter Your Email")
});

export default signupSchema;
