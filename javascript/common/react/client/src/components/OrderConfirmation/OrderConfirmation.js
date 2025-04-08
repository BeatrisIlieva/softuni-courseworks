import { orderConfirmationServiceFactory } from "../../services/orderConfirmationService";
import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import styles from "./OrderConfirmation.module.css";
import { useBagContext } from "../../contexts/BagContext";

export const OrderConfirmation = () => {
  const orderConfirmationService = useService(orderConfirmationServiceFactory);
  const { userId } = useAuthContext();
  const [currentOrder, setOrder] = useState(null);
  const [currentAddress, setAddress] = useState(null);
  const { clearShoppingBag } = useBagContext();

  useEffect(() => {
    fetchOrderAndAddress();
  }, []);

  const fetchOrderAndAddress = async () => {
    try {
      const { order, address } = await orderConfirmationService.display(userId);

      setOrder(order);
      setAddress(address);
      clearShoppingBag();
    } catch (error) {
      console.error("Error fetching order and address:", error);
    }
  };

  return (
    <>
      {
        (currentOrder,
        currentAddress && (
          <>
            <section className={styles["order-details-section"]}>
              <div className={styles["order-title-content"]}>
                <h4>
                  Thank you for your purchase, {currentAddress.firstName}!
                </h4>
              </div>
              <div className={styles["order-details-wrapper"]}>
                <div>
                  <h5 className={styles["order-subtitle-content"]}>
                    Order Confirmation:
                  </h5>
                  <p className={styles["order-info"]}>
                    Your order ID: #{currentOrder._id}
                    has been successfully placed.
                  </p>
                  <p className={styles["order-info"]}>
                    Our team will reach out to you shortly with the confirmed
                    delivery date.
                  </p>
                </div>
                <div>
                  <h5 className={styles["order-subtitle-content"]}>
                    {" "}
                    Order Details:
                  </h5>
                  <p className={styles["order-info"]}>
                    Total price: {currentOrder.subTotal}
                  </p>
                  <p className={styles["order-info"]}>
                    Country: {currentAddress.country}
                  </p>
                  <p className={styles["order-info"]}>
                    City: {currentAddress.city}
                  </p>
                  <p className={styles["order-info"]}>
                    Delivery Address: {currentAddress.address}
                  </p>
                  <p className={styles["order-info"]}>
                    Phone number: {currentAddress.phoneNumber}
                  </p>
                </div>
              </div>
            </section>
            <section className={styles["cards"]}>
              {currentOrder.jewelries.map((j) => (
                <article key={j._id} className={styles["card"]}>
                  <div className={styles["thumbnail"]}>
                    <img
                      className={styles["thumbnail__img"]}
                      src={j.firstImageUrl}
                      alt={j.title}
                      image
                    />
                  </div>
                  <div className={styles["content"]}>
                    <h2 className={styles["content__title"]}>
                      {j.jewelryTitle}
                    </h2>
                    <p className={styles["content__category"]}>
                      {j.categoryTitle}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          </>
        ))
      }
    </>
  );
};
