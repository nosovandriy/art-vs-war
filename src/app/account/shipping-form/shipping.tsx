import { Dispatch, FC, SetStateAction, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

import style from '../account.module.scss'

import ShippingData from "./shippingData";
import { AccountData } from "@/types/Account";
import { ShippingFormData } from "@/types/ShippingForm";
import ShippingForm from "./shippingForm";
import { ArrowDownIcon } from "@/app/icons/iconArrowUp/icon-arrow-down";

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

type Props = {
  account: AccountData | null;
  address: ShippingFormData | null;
  setAccount: Dispatch<SetStateAction<AccountData | null>> | null;
}

const Shipping: FC<Props> = ({ account, setAccount, address }) => {
  const [isOpenForm, setIsOpenForm] = useState(address ? false : true);

  return (
    <Accordion>
      <AccordionItem
        key="Shipping Address"
        aria-label="Shipping Address"
        title="Shipping Address"
        classNames={accordionStyles}
        indicator={<ArrowDownIcon />}
      >
        {(address && !isOpenForm) && (
          <ShippingData address={address} setIsOpenForm={setIsOpenForm} />
        )}

        {isOpenForm && (
          <ShippingForm
            address={address}
            account={account}
            setAccount={setAccount}
            setIsOpenForm={setIsOpenForm}
          />
        )}
      </AccordionItem>
    </Accordion>
)};

export default Shipping;
