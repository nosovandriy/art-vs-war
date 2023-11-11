import { FC, useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';

import style from './orders.module.scss';

import OrderCard from './orderCard';
import createHeaders from '@/utils/getAccessToken';
import { getOrderById } from '@/utils/api';
import { ArrowDownIcon } from '@/app/icons/iconArrowUp/icon-arrow-down';

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

type Props = {
  orders: any;
  user: any;
}

const OrdersList: FC<Props> = ({ orders, user }) => {
  const [details, setDetails] = useState<any>([]);

  const getOrdersDetails = async () => {
    const ordersIds = orders?.map((order: any) => ({
      id: order.id,
      createdAt: order.orderCreatedAt.orderCreatedAt,
    }))

    const headers = createHeaders(user);
    const detailsArray = [];

    for (const order of ordersIds) {
      const orderWithDetails = await getOrderById(headers, order.id);
      detailsArray.push({ ...orderWithDetails, createdAt: order.createdAt });
    }

    setDetails(detailsArray);
  }

  useEffect(() => {
    getOrdersDetails();
  }, []);

  return (
    <Accordion>
      <AccordionItem
        key="Orders"
        title="Orders"
        aria-label="Orders"
        classNames={accordionStyles}
        indicator={<ArrowDownIcon />}
      >
        {details.length && details.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </AccordionItem>
    </Accordion>
)};

export default OrdersList;
