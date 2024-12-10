import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProduct] = useState(products);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-start py-6 text-3xl">
        <Title title={"Negosiasi"} subtitle={"Tawarin Pilihanmu"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gapy-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={item.id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
