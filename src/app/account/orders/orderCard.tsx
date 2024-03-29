import { FC, useState } from 'react';
import Link from 'next/link';

import style from './orders.module.scss'

import { Order } from '@/types/Account';
import { OrderPainting } from '@/types/Painting';
import { setOrderDelivered } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';
import { useDisclosure } from '@nextui-org/react';
import ModalComponent from '@/app/profile/[slug]/modal/modal';
import { error } from 'console';

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
    orderEstimatedDeliveryAt,
    daysForAutomaticConfirm,
  } = tempOrder;

  const handleConfirm = async () => {
    const headers = createHeaders(user);

    setOrderDelivered(headers, id)
      .then(response => {
        console.log('response', response);

        setTempOrder(current => ({
          ...current,
          isDelivered: true,
          orderDeliveredAt: response?.orderDeliveredAt,
        }));
        onClose();
      })
      .catch(error => {
        console.log(error);
      });
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
          <div className={style.name}>
            {isDelivered ? 'Delivery date' : 'Estimated delivery date'}
          </div>
          <div className={style.name}>
            {isDelivered && orderDeliveredAt
              ? orderDeliveredAt?.date
              : orderEstimatedDeliveryAt?.date
            }
          </div>
        </div>

        {!isDelivered && (
          <div className={style.details}>
            <div className={style.name}>
              The system automatically confirm receipt after
            </div>
            <div className={style.name}>
              {daysForAutomaticConfirm}
            </div>
          </div>
        )}
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
