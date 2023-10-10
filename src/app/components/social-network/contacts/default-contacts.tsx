import {
  Facebook,
  Instagram,
  Whatsapp,
} from "@/app/icons/icons-social-networks";

export const defaultContacts = {
  instagram: "https://www.instagram.com/artvswar.gallery/",
  facebook: "https://www.facebook.com/groups/artvswar",
  whatsapp: "https://chat.whatsapp.com/IVMZK1nACjUDzygtfXUJ0N",
};

export const iconContacts = [
  {
    title: "Facebook",
    link: defaultContacts.facebook,
    icon: <Facebook />,
  },
  {
    title: "Instagram",
    link: defaultContacts.instagram,
    icon: <Instagram />,
  },
  {
    title: "Whatsapp",
    link: defaultContacts.whatsapp,
    icon: <Whatsapp />,
  },
];
