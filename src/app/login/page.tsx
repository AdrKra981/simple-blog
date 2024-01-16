"use client";
import { FunctionComponent } from "react";
import AuthForm from "../ui/organism/AuthForm";
import FormInput from "../ui/atoms/FormInput";
import Button from "../ui/atoms/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Your password is too short!")
      .required("Required"),
  });

  const handleSubmit = (values: any) => {
    console.log("values", values);
  };

  return (
    <div className="w-screen h-screen">
      <AuthForm type="login">
        <h1 className="width-full items-center justify-center flex py-16 text-2xl">
          Login Here
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className="px-8">
                  <FormInput
                    label="Email"
                    fullWidth
                    type="email"
                    margin="dense"
                    variant="filled"
                    error={Boolean(errors.email && touched.email)}
                    required
                  />
                  <FormInput
                    label="Password"
                    fullWidth
                    type="password"
                    margin="dense"
                    error={Boolean(errors.password && touched.password)}
                    required
                    variant="filled"
                  />

                  <Button>Login</Button>
                  <Link
                    href="/register"
                    className="flex items-center justify-center text-gray-500 mt-2"
                  >
                    You don't have a account? You can register here
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

export default LoginPage;
