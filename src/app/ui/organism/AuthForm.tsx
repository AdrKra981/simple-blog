"use client";
import { AccountCircleRounded, AppRegistration } from "@mui/icons-material";
import { Box, Paper, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FunctionComponent } from "react";

interface AuthFormProps {
  type: "login" | "register";
  children: React.ReactNode;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ type, children }) => {
  const router = useRouter();
  const activeStyle = {
    cursor: "pointer",
    background: "#739072",
    color: "#FFF",
  };

  const onButtonClick = async (clickedType: string) => {
    if (clickedType === "login") {
      return router.push("/login");
    }

    return router.push("/register");
  };

  return (
    <Box
      component={Paper}
      sx={{
        position: "absolute",
        left: "20%",
        right: "20%",
        top: "35%",
        maxHeight: 500,
        minWidth: 360,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div
            className="flex flex-col items-center justify-center width-full py-24"
            style={type === "login" ? activeStyle : { cursor: "pointer" }}
            onClick={() => onButtonClick("login")}
          >
            <AccountCircleRounded />
            Login
          </div>
          <div
            className="flex flex-col items-center justify-center width-full py-24"
            style={type === "register" ? activeStyle : { cursor: "pointer" }}
            onClick={() => onButtonClick("register")}
          >
            <AppRegistration />
            Register
          </div>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthForm;
