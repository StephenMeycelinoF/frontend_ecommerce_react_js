import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

export default function Negotiable() {
  const { products } = useContext(ShopContext);
  const [negotiable, setNegotiable] = useState([]);

  useEffect(() => {
    const negotiable = products.filter((item) => item.isNegotiable);
    setNegotiable(negotiable.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-3xl py-8">
        <Title title={"Negosiasi"} subtitle={"Tawarkan Pilihanmu"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {negotiable.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            isNegotiable={item.isNegotiable}
            isDiskon={item.isDiskon}
            isValue={item.isDiskon.discount}
          />
        ))}
      </div>
    </div>
  );
}
