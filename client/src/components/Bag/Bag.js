import { bagServiceFactory } from "../../services/bagService";
import { useService } from "../../hooks/useService";
import { useState, useEffect } from "react";

export const Bag = () => {
  const bagService = useService(bagServiceFactory);
  const [bagItems, setBagItems] = useState();

  const userId = 1;


  useEffect(() => {
    bagService
      .display(userId)
      .then(setBagItems)
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // useEffect(() => {
  //   fetchBagItems();
  // }, []);

  // const fetchBagItems = async () => {
  //   try {
  //     const bagData = await bagService.display();
  //     console.log(bagData);
  //     // const bagData = Array.isArray(data) ? data[0] : data;
  //     setBagItems(bagData);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return ( 
    <>
    <h1>bag items</h1>
    {bagItems &&(<div>{bagItems.totalTotalPrice}</div>)}     
    </> 

  );
};