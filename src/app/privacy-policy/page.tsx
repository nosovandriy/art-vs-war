import style from './page.module.scss';

const PrivacyPolicy = () => {
  return (
    <section className={style.privacyPolicy}>
      <h1 className={style.title}>Privacy Policy</h1>
      <p className={style.subtitle}>
        At Art vs War, we are committed to protecting your privacy and ensuring the security of any
        personal information you provide us. This Privacy Policy outlines how we collect, use,
        disclose, and protect your information when you visit our website or make a purchase.
      </p>

      <p className={style.step}>1. Information We Collect:</p>
      <p className={style.stepText}>
        Personal Information: When you place an order, we collect your name, email address, shipping
        address, and payment details to process and fulfill your order. Communication Information:
        If you contact us via email or other means of communication, we may collect and store
        information related to that communication.
      </p>
      <p className={style.step}>2. Use of Information:</p>
      <p className={style.stepText}>
        Order Processing: We use the information you provide to process and fulfill your order
        accurately and efficiently. Customer Support: We may use your information to respond to
        inquiries, provide assistance, and address any concerns you may have. Website Improvement:
        We analyze non-identifiable information to improve our website’s functionality, user
        experience, and effectiveness.
      </p>
      <p className={style.step}>3. Information Sharing:</p>
      <p className={style.stepText}>
        Third-Party Service Providers: We may share your information with trusted third-party
        service providers to facilitate order processing, shipping, payment processing, and
        marketing activities on behalf of Art vs War. Legal Requirements: We may disclose your
        information when necessary to comply with the law, enforce our website policies, or protect
        ours or others&apos; rights, property, or safety. Consent: We will not share your personal
        information with any other third parties without your consent.
      </p>
      <p className={style.step}>4. Data Security:</p>
      <p className={style.stepText}>
        We prioritize the security of your information and implement appropriate measures to protect
        it from unauthorized access, disclosure, alteration, or destruction. However, please note
        that no method of transmitting information over the internet or storing data electronically
        is completely secure. We cannot guarantee the absolute security of your information.
      </p>
      <p className={style.step}>5. Cookies and Tracking Technologies:</p>
      <p className={style.stepText}>
        Our website may use cookies and similar tracking technologies to enhance your browsing
        experience and provide personalized content and advertisements. You can modify your browser
        settings to disable cookies, but this may affect your overall website experience.
      </p>
      <p className={style.step}>6. Changes to the Privacy Policy:</p>
      <p className={style.stepText}>
        We reserve the right to modify or update this Privacy Policy at any time. Any changes will
        be effective immediately upon posting the updated policy on our website. By using our
        website, you consent to this Privacy Policy and agree to its terms and conditions. If you
        have any questions or concerns about our privacy practices or the use of your personal
        information, please contact us.
      </p>
    </section>
  );
};

export default PrivacyPolicy;
