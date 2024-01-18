"use client";
import { FunctionComponent } from "react";
import AuthForm from "../ui/organism/AuthForm";
import FormInput from "../ui/atoms/FormInput";
import Button from "../ui/atoms/Button";
import Link from "next/link";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { RegisterFormDataType } from "./types";

interface RegisterPageProps {}

const RegisterPage: FunctionComponent<RegisterPageProps> = () => {
  const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
    repeat_password: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const handleSubmit = (values: RegisterFormDataType) => {
    console.log("values", values);
  };

  return (
    <div className="w-screen h-screen">
      <AuthForm type="register">
        <h1 className="width-full items-center justify-center flex py-3 text-2xl">
          Register Here
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
            repeat_password: "",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => {
            return (
              <Form>
                <div className="px-2">
                  <FormInput
                    label="Username"
                    fullWidth
                    required
                    margin="dense"
                    variant="filled"
                    id="username"
                    error={Boolean(errors.username && touched.username)}
                    value={values.username}
                    helperText={touched.username && errors.username}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Email"
                    fullWidth
                    margin="dense"
                    variant="filled"
                    id="email"
                    required
                    error={Boolean(errors.email && touched.email)}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Password"
                    fullWidth
                    type="password"
                    required
                    margin="dense"
                    variant="filled"
                    id="password"
                    error={Boolean(errors.password && touched.password)}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Repeat password"
                    fullWidth
                    type="password"
                    required
                    margin="dense"
                    variant="filled"
                    id="repeat_password"
                    error={Boolean(
                      errors.repeat_password && touched.repeat_password
                    )}
                    value={values.repeat_password}
                    helperText={
                      touched.repeat_password && errors.repeat_password
                    }
                    onChange={handleChange}
                  />

                  <Button>Register</Button>
                  <Link
                    href="/login"
                    className="flex items-center justify-center text-gray-500 mt-2"
                  >
                    Do you have a account? Login here
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </AuthForm>
    </div>
  );
};

export default RegisterPage;
