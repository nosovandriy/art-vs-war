import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

import { CloseIcon } from "@/app/icons/icon-close";
import { MapPoint } from "@/app/icons/icon-map-point";
import { clearShippingInfo } from "@/app/redux/slices/shippingSlice";
import { CartItem } from "@/types/CartItem";

import style from "./order-item.module.scss";
type Props = {
  paintings: CartItem[];
  handleRemovePainting: (id: number) => void;
};

const OrderItem: React.FC<Props> = ({ paintings, handleRemovePainting }) => {
  const dispatch = useDispatch();

  const handleRemoveArts = (id: number) => {
    handleRemovePainting(id);
    dispatch(clearShippingInfo());
  };

  return (
    <>
      {paintings.map((painting: CartItem) => (
        <Fragment key={painting.id}>
          <div className={style.paintingWrapper}>
            <div className={style.imageWrapper}>
              <Link href={`/gallery/${painting.prettyId}`}>
                <Image
                  className={style.image}
                  src={painting.image}
                  alt={`Painting ${painting.prettyId} by artist ${painting.author}`}
                  width={600}
                  height={600}
                />
              </Link>
              <div
                className={style.closeIcon}
                onClick={() => handleRemoveArts(painting.id)}
              >
                <CloseIcon />
              </div>
            </div>
            <div className={style.paintingInfo}>
              <div className={style.paintingInfo}>
                <Link href={`/gallery/${painting.prettyId}`}>
                  <p className={style.title}>{painting.title}</p>
                </Link>
                <Link href={`/artists/${painting.authorId}`}>
                  <p className={style.author}>{`by ${painting.author}`}</p>
                </Link>
                <div className={style.country}>
                  <MapPoint />
                  {`${painting.country}`}
                </div>
                <p
                  className={style.size}
                >{`${painting.width} W x ${painting.height} H x ${painting.depth} D cm`}</p>
              </div>
              <p className={style.price}>{`${painting.price} €`}</p>
            </div>
          </div>
          <hr className={style.line} />
        </Fragment>
      ))}
    </>
  );
};

export default OrderItem;
