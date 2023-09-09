"use client";

import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";

import styles from "./collection-section.module.scss";

const HaveCollection = () => {
  const { user, route, signOut } = useAuthenticator((context) => [
    context.route,
  ]);

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
        {/* <Link href={"/about"} className={styles.button}>
          Learn more
        </Link> */}
        <button type="button" className={styles.button} onClick={signOut}>
          Sign Out
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
