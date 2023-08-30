"use client";

import React, { FC } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from '@/aws-exports';

import '@aws-amplify/ui-react/styles.css';

Amplify.configure({ ...awsExports, ssr: true });

type Props = {
  children: React.ReactNode;
};

const AuthenticatorProvider: FC<Props> = ({ children }) => {
  return (
    <Authenticator.Provider>
      {children}
    </Authenticator.Provider>
  );
};

export default AuthenticatorProvider;
