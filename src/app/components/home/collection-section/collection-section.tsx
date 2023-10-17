"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

import { getRegistrationLink } from "@/utils/account";

import styles from "./collection-section.module.scss";

const HaveCollection = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const router = useRouter();

  const handleButtonClick = () => {
    router.push(getRegistrationLink(user));
  };
  return (
    <section className={styles.collection}>
      <div className={styles.top}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Have an art collection?</h2>
        <h6 className={styles.subtitle}>
          You can donate your collection items to support Ukraine
        </h6>
        <button onClick={handleButtonClick} className={styles.button}>
          Learn more
        </button>
      </div>

      <div className={styles.bottom}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
    </section>
  );
};

export default HaveCollection;
