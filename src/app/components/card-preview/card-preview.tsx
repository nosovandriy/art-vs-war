import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import Link from "next/link";

import { Cart } from "@/app/icons/icon-cart";
import { CheckProduct } from "@/app/icons/icon-check-product";
import { addPaintingToCart } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { Painting } from "@/types/Painting";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { saveOrderPaintingToServer } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import { clearShippingInfo } from "@/app/redux/slices/shippingSlice";
import { setDataToLocalStorage } from "@/utils/localStorageData";

import "@styles/globals.scss";
import style from "./card-preview.module.scss";

type Props = {
  paintingDetails: Painting;
  className?: string;
};

const CardPreview: React.FC<Props> = ({ paintingDetails, className }) => {
  const dispatch = useAppDispatch();
  const { paintings } = useAppSelector((state) => state.cart);
  const { paintingsShippingInfo } = useAppSelector((state) => state.shipping);
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);

  const isPaintingSelected = paintings.some(
    (painting) => painting.prettyId === paintingDetails.prettyId
  );

  const {
    id,
    prettyId,
    imageUrl,
    title,
    authorFullName,
    authorPrettyId,
    authorCountry,
    paymentStatus,
    price,
    width,
    height,
    depth,
  } = paintingDetails;

  const isSoldPainting = paymentStatus === "SOLD";

  const handleAddPaintingToCart = () => {
    const orderData: CartItem = {
      id: id,
      prettyId: prettyId,
      title: title,
      price: price,
      author: authorFullName,
      authorId: authorPrettyId,
      country: authorCountry,
      image: imageUrl,
      width: width,
      height: height,
      depth: depth,
    };

    dispatch(addPaintingToCart(orderData));

    if (user) {
      saveOrderPaintingToServer(id, headers);
      setDataToLocalStorage([]);

    }

    if (paintingsShippingInfo) {
      dispatch(clearShippingInfo());
    }
  };

  return (
    <div className={`${style.card}`}>
      <Link href={`/gallery/${prettyId}`}>
        <Image
          src={imageUrl}
          alt={`${authorFullName} - ${title}`}
          width={440}
          height={800}
          className={`${style.image} ${className} imageOpacityEffect`}
          onLoadingComplete={(img) => (img.style.opacity = "1")}
        />
      </Link>
      <Link href={`/gallery/${prettyId}`} className={style.title}>
        {title}
      </Link>
      <Link href={`/artists/${authorPrettyId}`} className={style.artist}>
        {authorFullName}
      </Link>

      <div className={style.buy}>
        <p className={style.buy__price}>{`€ ${price}`}</p>
        {isSoldPainting ? (
          <div className={style.buy__iconSold}>SOLD</div>
        ) : (
          <>
            {isPaintingSelected ? (
              <div className={style.buy__icon}>
                <CheckProduct />
              </div>
            ) : (
              <div
                className={style.buy__icon}
                onClick={handleAddPaintingToCart}
              >
                <Cart />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
