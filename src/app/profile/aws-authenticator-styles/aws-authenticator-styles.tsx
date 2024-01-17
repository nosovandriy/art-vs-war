import { Button, Heading, Text, View, useAuthenticator, useTheme } from '@aws-amplify/ui-react';
import Image from 'next/image';

import './aws-authenticator-styles.scss';

export const authenticatorStylesComponents = {
  Header() {
    const { tokens } = useTheme();

    return <View textAlign="center" padding={tokens.space.large} className="accountWrapper"></View>;
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading level={3} className="textAccount">
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center" className="accountFooter">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
            className="accountFooter__button"
          >
            Forgot your password?
          </Button>
          <Image
            src={'/assets/accountOrnament.webp'}
            alt="process"
            width={200}
            height={200}
            className="accountFooter__image"
          />
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center" className="accountFooter">
          <Text fontSize={11} margin="-25px 0 10px" color="gray" textAlign="center" display="block">
            By pushing &apos;Create Account&apos;, you agree with the Terms of Use
          </Text>
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
            className="accountFooter__button"
          >
            Back to Sign In
          </Button>
          <Image
            src={'/assets/accountOrnament.webp'}
            alt="process"
            width={200}
            height={200}
            className="accountFooter__createAccountImage"
          />
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      // return (
      //   <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
      //     Enter Information:
      //   </Heading>
      // );
      return '';
    },
    Footer() {
      // return <Text>Footer Information</Text>;
      return '';
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return '';
      // return (
      //   <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
      //     Enter Information:
      //   </Heading>
      // );
    },
    Footer() {
      return '';
      // return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return '';
      // return (
      //   <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
      //     Enter Information:
      //   </Heading>
      // );
    },
    Footer() {
      return '';
      // return <Text>Footer Information</Text>;
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Reset your password
        </Heading>
      );
    },
    Footer() {
      return (
        <div className="imageAccountWrapper">
          <Image
            src={'/assets/accountOrnament.webp'}
            alt="process"
            width={200}
            height={200}
            className="imageAccountSecondary"
          />
        </div>
      );
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Create new password
        </Heading>
      );
    },
    Footer() {
      return (
        <div className="imageAccountWrapper">
          <Image
            src={'/assets/accountOrnament.webp'}
            alt="process"
            width={200}
            height={200}
            className="imageAccountSecondary"
          />
        </div>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  resetPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTOTP: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};
