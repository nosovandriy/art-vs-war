import Image from "next/image";

import ContactFrom from "./contact-form/contact-form";

import style from "./page.module.scss";

const Contacts = () => {
  return (
    <section className={style.contacts}>
      <div className={style.content}>
        <h1 className={style.title}>Contact Us</h1>
        <p className={style.subTitle}>
          Drop us a line for any questions about Art vs War
        </p>

        <ContactFrom />
      </div>

      <Image
        src="/assets/thanksOrnament.png"
        alt="Ukrainian gallery ornament"
        width={400}
        height={500}
        className={style.image}
      />
    </section>
  );
};

export default Contacts;
