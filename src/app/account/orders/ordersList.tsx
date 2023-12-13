import { FC, useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';

import style from './orders.module.scss';

import OrderCard from './orderCard';
import createHeaders from '@/utils/getAccessToken';
import { getOrderById } from '@/utils/api';
import { ArrowDownIcon } from '@/app/icons/iconArrowUp/icon-arrow-down';
import { Order } from '@/types/Account';

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

type Props = {
  orders: Order[];
  user: any;
};

const OrdersList: FC<Props> = ({ orders, user }) => {

  return (
    <Accordion>
      <AccordionItem
        key="Orders"
        title="Orders"
        aria-label="Orders"
        classNames={accordionStyles}
        indicator={<ArrowDownIcon />}
      >
        {orders.length && orders.map((order: any) => (
          <OrderCard key={order.id} order={order} user={user} />
        ))}
      </AccordionItem>
    </Accordion>
)};

export default OrdersList;
