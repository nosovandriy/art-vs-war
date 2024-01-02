import { FC, useState } from 'react';
import Link from 'next/link';

import style from './orders.module.scss'

import { Order } from '@/types/Account';
import { OrderPainting } from '@/types/Painting';
import { setOrderDelivered } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';
import { useDisclosure } from '@nextui-org/react';
import ModalComponent from '@/app/profile/[slug]/modal/modal';

type Props = {
  user: any;
  order: Order;
};

const OrderCard: FC<Props> = ({ order, user }) => {
  const [tempOrder, setTempOrder] = useState(order);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    id,
    paintings,
    totalAmount,
    isDelivered,
    shippingAmount,
    orderCreatedAt,
    orderDeliveredAt,
    orderEstimatedDeliverydAt,
  } = tempOrder;

  const handleConfirm = async () => {
    const headers = createHeaders(user);

    try {
      await setOrderDelivered(headers, id);
      setTempOrder(current => ({ ...current, isDelivered: true }));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.order}>
      <ModalComponent
        content="Do you want to confirm order delivery?"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAction={handleConfirm}
      />

      <div className={style.number}>{`№${id}`}</div>

      <div className={style.date}>{orderCreatedAt.date}</div>

      <div className={style.orders}>
        {paintings.map((painting: OrderPainting) => (
          <div key={painting.id} className={style.itemContainer}>
            <Link href={`/gallery/${painting.prettyId}`}>
              <div className={style.title}>
                {painting.title}
              </div>
            </Link>

            <div className={style.details}>
              <Link href={`/artists/${painting.authorPrettyId}`}>
                <span className={style.name}>
                  by {painting.authorFullName}
                </span>
              </Link>

              <span className={style.price}>
                € {painting.price}
              </span>
            </div>
          </div>
        ))}

        <div className={style.shippingContainer}>
          <div className={style.title}>Shipping</div>
          <div className={style.price}>
            € {shippingAmount}
          </div>
        </div>

        <div className={style.details}>
          <div className={style.name}>Delivery date</div>
          <div className={style.name}>
            {isDelivered && orderDeliveredAt
              ? orderDeliveredAt?.date
              : orderEstimatedDeliverydAt?.date
            }
          </div>
        </div>
      </div>

      <div className={style.buttonContainer}>
        <div className={style.number}>
          Total: € {totalAmount}
        </div>

        {isDelivered
          ? (
            <div className={style.delivered}>Delivered</div>
          ) : (
            <button
              type="button"
              className={style.button}
              onClick={onOpen}
            >
              Confirm delivery
            </button>
          )
        }
      </div>
    </div>
  );
};

export default OrderCard;
