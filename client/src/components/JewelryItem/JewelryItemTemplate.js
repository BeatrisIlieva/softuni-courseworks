import styles from "./JewelryItemTemplate.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import { bagServiceFactory } from "../../services/bagService";
import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { useState } from "react";

export const JewelryItemTemplate = ({
  _id,
  firstImageUrl,
  secondImageUrl,
  jewelryTitle,
  categoryTitle,
  metalInfo,
  stoneInfo,
  price,
  sizes,
}) => {
  const bagService = useService(bagServiceFactory);

  const onAddToBagSubmit = async () => {
    await bagService.addToBag(values, _id);
  };

  const SizeFormKeys = {
    Size: "size",
  };

  const [values, setValues] = useState({[SizeFormKeys.Size]: 0});

  const changeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    onAddToBagSubmit(values);

    setValues({
      values,
    });
  };

  // const { values, changeHandler, onSubmit } = useForm(
  //   {
  //     [SizeFormKeys.Size]: 0,
  //   },
  //   onAddToBagSubmit
  // );

  return (
    <div className={styles["relative-container-details"]}>
      <section className={styles["jewelry-details-wrapper"]}>
        <div className={styles["jewelry-details-left-container"]}>
          <div className={styles["jewelry-details-image-first"]}>
            <img
              className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
              src={firstImageUrl}
              alt={jewelryTitle}
            />
          </div>
          <div className={styles["jewelry-details-image-second"]}>
            <img
              className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
              src={secondImageUrl}
              alt={jewelryTitle}
            />
          </div>
        </div>
        <div className={styles["jewelry-details-right-container"]}>
          <div
            className={`${styles["jewelry-details-composition"]} ${styles["right-sticky"]} `}
          >
            <h6
              className={`${styles["composition-category"]} ${styles["category"]}`}
            >
              {categoryTitle}
            </h6>
            <h5 className={`${styles["composition-title"]} ${styles["title"]}`}>
              {jewelryTitle}
            </h5>
            <ul role="list">
              <li className={styles["details-items"]}>
                {metalInfo.map((item, index) => (
                  <span key={index} classNames={styles["composition-item"]}>
                    {item.caratWeight &&
                      item.caratWeight.$numberDecimal &&
                      `${item.caratWeight.$numberDecimal}ct.`}{" "}
                    {item.metal.title}
                    {index !== metalInfo.length - 1 && ", "}
                  </span>
                ))}
              </li>
              <li className={styles["details-items"]}>
                {stoneInfo.map((item, index) => (
                  <span key={index} classNames={styles["composition-item"]}>
                    {item.caratWeight &&
                      item.caratWeight.$numberDecimal &&
                      `${item.caratWeight.$numberDecimal}ct.`}{" "}
                    {item.stoneColor} {item.stoneType}
                    {index !== stoneInfo.length - 1 && ", "}
                  </span>
                ))}
              </li>
              <li>
                <div className={styles["price"]}>${price}</div>
              </li>
              <li className="composition-details">
                <form onSubmit={onSubmit} method="POST">
                  <h3>
                    <label className="materials">Size:</label>
                  </h3>
                  <div className="materials-details">
                    {sizes.map((item) => (
                      <div key={item._id}>
                        <label htmlFor={item._id}>
                          {item.measurement.$numberDecimal}
                        </label>
                        <input
                          type="radio"
                          name={SizeFormKeys.Size}
                          id={item._id}
                          value={item._id}
                          onChange={changeHandler}
                          checked={
                            Number(values[SizeFormKeys.Size]) === item._id
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <input
                    className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                    type="submit"
                    value="Sign In"
                  />
                </form>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
