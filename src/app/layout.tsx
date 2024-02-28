import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

import { Metadata } from "next";
import ReduxProvider from "@redux/redux-provider";
import AuthenticatorProvider from "./authenticator/authenticatior";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

import "@styles/globals.scss";
import NextUiProvider from "./nextui/nextuiProvider";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://artvswar.gallery"),
  title: {
    default: "Art vs War GALLERY",
    template: `%s | Art vs War GALLERY`,
  },
  description:
    "Our project is dedicated to supporting Ukraine by providing a platform for artists and creatives to showcase their work, connect with appreciative customers and offer a unique opportunity to acquire artwork while contributing to a noble cause.",
  icons: "./favicon.ico",
  keywords: "artist, gallery, paintings, ukraine artists, arts, ukraine",
  openGraph: {
    title: "Art vs War GALLERY",
    description:
      "Our project is dedicated to supporting Ukraine by providing a platform for artists and creatives to showcase their work, connect with appreciative customers and offer a unique opportunity to acquire artwork while contributing to a noble cause.",
    url: "https://artvswar.gallery/",
    siteName: "Art vs War GALLERY",
    images: [
      {
        url: "https://artvswar.gallery/assets/logo_icon.svg",
      },
    ],
    type: "website",
  },
  verification: {
    google:
      "google-site-verification=CiWabaZpuVq9uj6GuxU12zKD5rYiLx70khn4J0xJvg4",
  },
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body
        className={`${openSansFont.variable} ${kyivFont.variable}`}
      >
        <ReduxProvider>
          <AuthenticatorProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthenticatorProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
