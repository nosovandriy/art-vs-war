import { PaintingsShippingInfo } from "@/types/ShippingForm";

export const calculateTotalShippingInfo = (
  shippingInfo: PaintingsShippingInfo[]
) => {
  let totalShippingPrice = 0;
  let totalDeliveryMinDays = Infinity;
  let totalDeliveryMaxDays = -Infinity;

  shippingInfo.forEach((item) => {
    totalShippingPrice += item.shippingPrice;
    totalDeliveryMinDays = Math.min(totalDeliveryMinDays, item.deliveryMinDays);
    totalDeliveryMaxDays = Math.max(totalDeliveryMaxDays, item.deliveryMaxDays);
  });

  const data = {
    totalShippingPrice,
    totalDeliveryMinDays,
    totalDeliveryMaxDays,
  };

  return [data];
};
