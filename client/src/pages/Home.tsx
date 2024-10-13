/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import ShopCard from "../components/ShopCard";

const Home = () => {
  const { data: shops } = useQuery("getAllShops", apiClient.getAllShops, {refetchInterval: 30 * 1000});

  return (
    <div>
      {shops && shops.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map((shop) => (
            <ShopCard key={shop._id} shop={shop}/>
          ))}
        </div>
      ) : (
        <div className="mt-16">
          <h1 className="font-bold text-2xl text-center">
            No shop available at the moment
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
