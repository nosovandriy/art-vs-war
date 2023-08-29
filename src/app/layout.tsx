import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";

import "@styles/globals.scss";

import ReduxProvider from "@redux/redux-provider";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import AuthenticatorProvider from "./authenticator/authenticatior";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const kyivFont = localFont({
  src: "../fonts/KyivTypeSans-Regular-.woff",
  weight: "400",
  style: "normal",
  variable: "--font-kyiv",
  display: "swap",
});

const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-openSans",
  display: "swap",
});

export const metadata = {
  title: "Art vs war",
  description: "Artists gallery",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${openSansFont.variable} ${kyivFont.variable}`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
          <AuthenticatorProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Header />
            {children}
            <Footer />
          </AuthenticatorProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
