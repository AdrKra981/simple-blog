"use client";
import React from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";

function ReduxProvider({ children }: any) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
