import { Link } from "react-router-dom";
import {ShopType} from "../utils/types";
import { FaStar } from "react-icons/fa6";
import ShopImageCarousel from "./ShopImageCaraousel";

type Props = {
    shop: ShopType
}

const ShopCard = ({shop}: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="h-[275px]">
        <ShopImageCarousel images={shop.images} />
      </div>
      <Link
        to={`/detail/${shop._id}`}
        className="absolute cursor-pointer group bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-lg hover:h-full hover:bg-opacity-60 transition-colors ease-in-out flex flex-col"
      >
        <span className="text-white font-bold tracking-tight text-3xl block flex-1">
          {shop.name}
        </span>
        <span className="text-white font-bold tracking-tight text-xl hidden group-hover:block">
          {shop.locality}
        </span>
        <span className="text-white font-bold tracking-tight text-lg hidden group-hover:block">
          {shop.costForTwo} for two
        </span>
        <span className="text-white font-bold tracking-tight text-lg hidden group-hover:block">
          {Array.from({ length: shop.rating }).map((_, idx) => (
            <FaStar className="fill-orange-400 inline" key={idx} />
          ))}
        </span>
      </Link>
    </div>
  );
};

export default ShopCard;
