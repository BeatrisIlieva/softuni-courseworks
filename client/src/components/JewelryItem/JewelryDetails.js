import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleJewelry } from "./SingleJewelry";
import * as jewelryService from "../../services/jewelries/jewelryService";

export const JewelryDetails = () => {
  const { categoryId, jewelryId } = useParams();
  const [jewelry, setJewelry] = useState(null);

  useEffect(() => {
    jewelryService
      .getOne(categoryId, jewelryId)
      .then((data) => {
        const jewelryData = Array.isArray(data) ? data[0] : data;

        setJewelry(jewelryData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [categoryId, jewelryId]);

  return <div>{jewelry && <SingleJewelry {...jewelry} />}</div>;
};
