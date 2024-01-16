import { FunctionComponent } from "react";
import AuthForm from "../ui/organism/AuthForm";
import FormInput from "../ui/atoms/FormInput";
import Button from "../ui/atoms/Button";
import Link from "next/link";

interface RegisterPageProps {}

const RegisterPage: FunctionComponent<RegisterPageProps> = () => {
  return (
    <div className="w-screen h-screen">
      <AuthForm type="register">
        <h1 className="width-full items-center justify-center flex py-3 text-2xl">
          Register Here
        </h1>
        <div className="px-2">
          <FormInput
            label="Username"
            fullWidth
            required
            margin="dense"
            variant="filled"
          />
          <FormInput
            label="Email"
            fullWidth
            margin="dense"
            variant="filled"
            required
          />
          <FormInput
            label="Password"
            fullWidth
            type="password"
            required
            margin="dense"
            variant="filled"
          />
          <FormInput
            label="Repeat password"
            fullWidth
            type="password"
            required
            margin="dense"
            variant="filled"
          />

          <Button>Register</Button>
          <Link
            href="/login"
            className="flex items-center justify-center text-gray-500 mt-2"
          >
            Do you have a account? Login here
          </Link>
        </div>
      </AuthForm>
    </div>
  );
};

export default RegisterPage;
