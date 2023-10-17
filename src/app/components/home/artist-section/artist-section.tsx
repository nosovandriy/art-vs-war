'use client'

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

import Carousel from "./carousel/carousel";
import { getRegistrationLink } from "@/utils/account";

import styles from "./artist-section.module.scss";

const Artist = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const router = useRouter();

  const handleButtonClick = () => {
    router.push(getRegistrationLink(user));
  };

  return (
    <section className={styles.artist}>
      <div className={styles.content}>
        <div className={styles.background}>
          <Carousel />
        </div>

        <h2 className={styles.title}>Are you an artist?</h2>
        <h6 className={styles.subtitle}>
          Become a part of our conscious community
        </h6>
        <button className={styles.button} onClick={handleButtonClick}>
          Create account
        </button>
      </div>
    </section>
  );
};

export default Artist;
