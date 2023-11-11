import { FC } from 'react';

import style from './orders.module.scss'

type Props = {
  order: any;
}

const OrderCard: FC<Props> = ({ order}) => {
  const { id, createdAt, paintings } = order;

  return (
    <div className={style.order}>
      <div className={style.number}>{id}</div>

      <div className={style.date}>{createdAt.slice(0, createdAt.length - 1)}</div>

      <div className={style.orders}>
        {paintings.map((painting: any) => (
          <div key={painting.id} className={style.itemContainer}>
            <div className={style.title}>{painting.title}</div>
            <div className={style.details}>
              <span className={style.name}>{`by ${painting.authorFullName}`}</span>
              <span className={style.price}>{`${painting.price} $`}</span>
            </div>
          </div>
        ))}

        <div className={style.shippingContainer}>
          <div className={style.title}>Shipping</div>
          <div className={style.price}>{`$${order.shippingAmount}`}</div>
        </div>
      </div>

      <div className={style.buttonContainer}>
        <div className={style.number}>{`Total: $${order.totalAmount}`}</div>
        <div className={style.button}>Confirm</div>
      </div>
    </div>
  );
};

export default OrderCard;
