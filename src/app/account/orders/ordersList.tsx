import { FC } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

import style from './orders.module.scss';

import OrderCard from './orderCard';
import { ArrowDownIcon } from '@/app/icons/iconArrowUp/icon-arrow-down';
import { Order } from '@/types/Account';

export const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

type Props = {
  user: any;
  orders: Order[];
};

const OrdersList: FC<Props> = ({ orders, user }) => {
  const searchParams = useSearchParams();

  return (
    <Accordion id="target" defaultExpandedKeys={[searchParams.get('tab') || '']}>
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
