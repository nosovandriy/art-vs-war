import Link from "next/link";


import { iconContacts } from "./contacts/default-contacts";

type Props = {
  className?: string;
};

const SocialNetworkIcons: React.FC<Props> = ({ className }) => {
  return (
    <>
      {iconContacts.map((iconContact, index) => (
        <Link
          key={index}
          href={iconContact.link}
          target="_blank"
          rel="noreferrer noopener"
          title={iconContact.title}
          className={className}
        >
          {iconContact.icon}
        </Link>
      ))}
    </>
  );
};

export default SocialNetworkIcons;
