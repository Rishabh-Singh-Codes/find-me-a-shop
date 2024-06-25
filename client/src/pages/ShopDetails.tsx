import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import EdibleCategorySection from "@/components/EdibleCategorySection";
import { useState } from "react";
import ItemList from "@/components/ItemList";

const ShopDetails = () => {
  const { shopId } = useParams();
  const [category, setCategory] = useState("coffee");
  const { data: shop } = useQuery(
    "getShopDetails",
    () => apiClient.getShopDetails(shopId as string),
    {
      enabled: !!shopId,
    }
  );

  if (!shop) {
    return (
      <div className="mt-16">
        <h1 className="font-bold text-2xl text-center">
          Unable to fetch shop details at the moment.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-5xl font-bold">{shop.name}</h1>
          <h2 className="text-sm font-semibold">
            Cost for two: {shop.costForTwo}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row mt-2 items-center justify-center md:justify-between">
          <div className="flex">
            <span className="text-sm font-bold flex items-center">
              {shop.locality}&nbsp;|&nbsp;
            </span>
            <span className="flex items-center">
              {Array.from({ length: shop.rating }).map((_, idx) => (
                <FaStar className="fill-orange-400 inline" key={idx} />
              ))}
            </span>
          </div>
          <span className="text-xs font-semibold">{shop.address}</span>
        </div>
      </div>
      <div className="flex flex-col md:w-3/5 mx-auto">
        <EdibleCategorySection category={category} setCategory={setCategory} />
        <ItemList
          items={shop.categories[category]}
          shopId={shopId}
          category={category}
        />
      </div>
    </div>
  );
};

export default ShopDetails;
