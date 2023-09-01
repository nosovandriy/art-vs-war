import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

import ReduxProvider from "@redux/redux-provider";
import AuthenticatorProvider from "./authenticator/authenticatior";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

import "@styles/globals.scss";

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
  metadataBase: new URL("https://develop.artvswar.gallery"),
  title: {
    default: "Art vs. War GALLERY",
    template: `%s | Art vs. War GALLERY`,
  },
  description:
    "Our project dedicated to supporting Ukrainian artists and creatives who have been displaced abroad due to the war in Ukraine. We offer a unique opportunity to purchase their artwork while contributing to a good cause.",
  icons: "./favicon.ico",
  keywords: "artist, gallery, paintings, ukraine artists, arts, ukraine",
  openGraph: {
    title: "Art vs. War GALLERY",
    description:
      "Our project dedicated to supporting Ukrainian artists and creatives who have been displaced abroad due to the war in Ukraine. We offer a unique opportunity to purchase their artwork while contributing to a good cause.",
    url: "https://artvswar.gallery/",
    siteName: "Art vs. War GALLERY",
    images: [
      {
        url: "https://artvswar.gallery/assets/logo_icon.svg",
      },
    ],
    type: "website",
  },
  verification: {
    google:
      "google-site-verification=0m4tMeZMyX-batXw4H8H-CUJyAxN2ClefDqs-TAVxkA",
  },
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
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
};

export default RootLayout;
