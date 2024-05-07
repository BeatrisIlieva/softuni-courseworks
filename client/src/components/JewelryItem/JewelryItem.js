import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jewelryServiceFactory } from "../../services/jewelryService";
import { useService } from "../../hooks/useService";
import styles from "./JewelryItemTemplate.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import { bagServiceFactory } from "../../services/bagService";

export const JewelryItem = () => {
  const { categoryId, jewelryId } = useParams();
  const [jewelry, setJewelry] = useState();
  const jewelryService = useService(jewelryServiceFactory);
  const bagService = useService(bagServiceFactory);

  useEffect(() => {
    fetchJewelry();
  }, [categoryId, jewelryId]);

  const fetchJewelry = async () => {
    try {
      const data = await jewelryService.getOne(categoryId, jewelryId);
      const jewelryData = Array.isArray(data) ? data[0] : data;
      setJewelry(jewelryData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const SizeFormKeys = {
    Size: "size",
  };

  const [values, setValues] = useState({ [SizeFormKeys.Size]: 0 });

  const changeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (categoryId === "2") {
      const sizeId = jewelry.sizes[0]._id;

      await bagService.addToBag({ size: sizeId }, jewelry._id);
    } else {
      await bagService.addToBag(values, jewelry._id);
    }

    fetchJewelry();
  };

  if (categoryId === "2") {
    return (
      <>
        {jewelry && (
          <div className={styles["jewelry-details-container"]}>
            <div className={styles["jewelry-details-images-container"]}>
              <div className={styles["jewelry-details-image"]}>
                <img
                  className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
                  src={jewelry.firstImageUrl}
                  alt={jewelry.title}
                />
              </div>
              <div className={styles["jewelry-details-image"]}>
                <img
                  className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
                  src={jewelry.secondImageUrl}
                  alt={jewelry.title}
                />
              </div>
            </div>
            <div className={styles["jewelry-details-composition-container"]}>
              <div className={styles["jewelry-details-composition-sticky"]}>
                <h2 className={styles["jewelry-details-jewelry-title"]}>
                  {jewelry.title} {jewelry.categoryTitle}
                </h2>
                <ul role="list">
                  <li className={styles["jewelry-details-composition-metals"]}>
                    {jewelry.metalInfo.map((item, index) => (
                      <span key={index} classNames={styles["composition-item"]}>
                        {item.caratWeight &&
                          item.caratWeight.$numberDecimal &&
                          `${item.caratWeight.$numberDecimal}ct.`}{" "}
                        {item.metal.title}
                        {index !== jewelry.metalInfo.length - 1 && (
                          <>
                            ,<br />
                          </>
                        )}
                      </span>
                    ))}
                  </li>
                  <li className={styles["jewelry-details-composition-stones"]}>
                    {jewelry.stoneInfo.map((item, index) => (
                      <span key={index} className={styles["composition-item"]}>
                        {item.caratWeight &&
                          item.caratWeight.$numberDecimal &&
                          `${item.caratWeight.$numberDecimal}ct.`}{" "}
                        {item.stoneColor} {item.stoneType}
                        {index !== jewelry.stoneInfo.length - 1 && (
                          <>
                            ,<br />
                          </>
                        )}
                      </span>
                    ))}
                  </li>
                  <li>
                    <div className={styles["jewelry-details-composition-size"]}>
                      <p>
                        Size: {jewelry.sizes[0].measurement.$numberDecimal} cm.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div
                      className={styles["jewelry-details-composition-price"]}
                    >
                      <h4>${jewelry.price}</h4>
                    </div>
                  </li>
                  <li>
                    {/* <h4>
                      {jewelry.sizes[0].measurement.$numberDecimal} cm.
                    </h4> */}
                    <form onSubmit={onSubmit} method="POST">
                      <div className={styles["add-to-bag-button"]}>
                        <input
                          className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                          type="submit"
                          value="ADD TO BAG"
                        />
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {jewelry && (
          <div className={styles["jewelry-details-container"]}>
            <div className={styles["jewelry-details-images-container"]}>
              <div className={styles["jewelry-details-image"]}>
                <img
                  className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
                  src={jewelry.firstImageUrl}
                  alt={jewelry.title}
                />
              </div>
              <div className={styles["jewelry-details-image"]}>
                <img
                  className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
                  src={jewelry.secondImageUrl}
                  alt={jewelry.title}
                />
              </div>
            </div>
            <div className={styles["jewelry-details-composition-container"]}>
              <div className={styles["jewelry-details-composition-sticky"]}>
                <h2 className={styles["jewelry-details-jewelry-title"]}>
                  {jewelry.title} {jewelry.categoryTitle}
                </h2>
                <ul role="list">
                  <li className={styles["jewelry-details-composition-metals"]}>
                    {jewelry.metalInfo.map((item, index) => (
                      <span key={index} classNames={styles["composition-item"]}>
                        {item.caratWeight &&
                          item.caratWeight.$numberDecimal &&
                          `${item.caratWeight.$numberDecimal}ct.`}{" "}
                        {item.metal.title}
                        {index !== jewelry.metalInfo.length - 1 && (
                          <>
                            ,<br />
                          </>
                        )}
                      </span>
                    ))}
                  </li>
                  <li className={styles["jewelry-details-composition-stones"]}>
                    {jewelry.stoneInfo.map((item, index) => (
                      <span key={index} className={styles["composition-item"]}>
                        {item.caratWeight &&
                          item.caratWeight.$numberDecimal &&
                          `${item.caratWeight.$numberDecimal}ct.`}{" "}
                        {item.stoneColor} {item.stoneType}
                        {index !== jewelry.stoneInfo.length - 1 && (
                          <>
                            ,<br />
                          </>
                        )}
                      </span>
                    ))}
                  </li>
                  <li>
                    <div
                      className={styles["jewelry-details-composition-price"]}
                    >
                      <h4>${jewelry.price}</h4>
                    </div>
                  </li>
                  <li className={styles["jewelry-details-composition-size"]}>
                    <h4
                      className={
                        styles["jewelry-details-composition-size-title"]
                      }
                    >
                      Size
                    </h4>
                    <form onSubmit={onSubmit} method="POST">
                      <div className={styles["radio-container"]}>
                        {jewelry.sizes.map((item) =>
                          item.available ? (
                            <div key={item._id}>
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
                              <label htmlFor={item._id}>
                                {item.title}
                                {/* {item.measurement.$numberDecimal} cm. */}
                              </label>
                            </div>
                          ) : (
                            <div key={item._id}>
                              <input
                                type="radio"
                                disabled
                                name={SizeFormKeys.Size}
                                id={item._id}
                                value={item._id}
                                onChange={changeHandler}
                                checked={
                                  Number(values[SizeFormKeys.Size]) === item._id
                                }
                              />
                              <label htmlFor={item._id}>
                                {item.title}
                                {/* {item.measurement.$numberDecimal} cm. */}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      <div className={styles["add-to-bag-button"]}>
                        <input
                          className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                          type="submit"
                          value="ADD TO BAG"
                        />
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};
