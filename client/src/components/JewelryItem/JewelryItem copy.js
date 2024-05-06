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

  const bagService = useService(bagServiceFactory);

  const SizeFormKeys = {
    Size: "size",
  };

  const [values, setValues] = useState({ [SizeFormKeys.Size]: 0 });

  const changeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await bagService.addToBag(values, jewelry._id);

    fetchJewelry();
  };

  return (
    <div>
      {jewelry && (
        <div className={styles["relative-container-details"]}>
          <section className={styles["jewelry-details-wrapper"]}>
            <div className={styles["jewelry-details-left-container"]}>
              <div className={styles["jewelry-details-image-first"]}>
                <img
                  className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
                  src={jewelry.firstImageUrl}
                  alt={jewelry.jewelryTitle}
                />
              </div>
              <div className={styles["jewelry-details-image-second"]}>
                <img
                  className={`${styles["jewelry-details-img"]} ${styles["zoom-image"]}`}
                  src={jewelry.secondImageUrl}
                  alt={jewelry.jewelryTitle}
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
                  {jewelry.categoryTitle}
                </h6>
                <h5
                  className={`${styles["composition-title"]} ${styles["title"]}`}
                >
                  {jewelry.jewelryTitle}
                </h5>
                <ul role="list">
                  <li className={styles["details-items"]}>
                    {jewelry.metalInfo.map((item, index) => (
                      <span key={index} classNames={styles["composition-item"]}>
                        {item.caratWeight &&
                          item.caratWeight.$numberDecimal &&
                          `${item.caratWeight.$numberDecimal}ct.`}{" "}
                        {item.metal.title}
                        {index !== jewelry.metalInfo.length - 1 && ", "}
                      </span>
                    ))}
                  </li>
                  <li className={styles["details-items"]}>
                    {jewelry.stoneInfo.map((item, index) => (
                      <span key={index} classNames={styles["composition-item"]}>
                        {item.caratWeight &&
                          item.caratWeight.$numberDecimal &&
                          `${item.caratWeight.$numberDecimal}ct.`}{" "}
                        {item.stoneColor} {item.stoneType}
                        {index !== jewelry.stoneInfo.length - 1 && ", " && <br />}
                      </span>
                    ))}
                  </li>
                  <li>
                    <div className={styles["price"]}>${jewelry.price}</div>
                  </li>
                  <li className={styles["composition-details"]}>
                    <h3>Size</h3>
                    <form onSubmit={onSubmit} method="POST">
                      <div
                        className={styles["radio-container"]}
                      >
                        {jewelry.sizes.map((item) => (
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
                              {item.measurement.$numberDecimal}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div>
                        <input
                          className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]} ${styles["add-to-bag-button"]}`}
                          type="submit"
                          value="Sign In"
                        />
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );

  // return <div>{jewelry && <JewelryItemTemplate {...jewelry} />}</div>;
};
