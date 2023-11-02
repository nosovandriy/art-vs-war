"use client";

import { NextUIProvider } from "@nextui-org/react";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const NextUiProvider: FC<Props> = ({ children }) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
};

export default NextUiProvider;
