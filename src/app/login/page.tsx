"use client";
import { FunctionComponent } from "react";
import AuthForm from "../ui/organism/AuthForm";
import FormInput from "../ui/atoms/FormInput";
import Button from "../ui/atoms/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { LoginFormDataType } from "./types";
import { request } from "../../../helpers/request";
import { useRouter } from "next/navigation";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const router = useRouter();
  const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Your password is too short!")
      .required("Required"),
  });

  const onSuccessLogin = () => {
    return router.push("/");
  };

  const handleSubmit = (values: LoginFormDataType) => {
    console.log("values", values);
    request({
      endpoint: "/user/login",
      method: "POST",
      data: values,
      onSuccess: onSuccessLogin,
    });
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
          {({ errors, touched, values, handleChange }) => {
            return (
              <Form>
                <div className="px-8">
                  <FormInput
                    label="Email"
                    fullWidth
                    type="email"
                    margin="dense"
                    variant="filled"
                    id="email"
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email}
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    label="Password"
                    fullWidth
                    type="password"
                    margin="dense"
                    error={Boolean(errors.password && touched.password)}
                    required
                    id="password"
                    value={values.password}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                    variant="filled"
                  />

                  <Button type="submit">Login</Button>
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
