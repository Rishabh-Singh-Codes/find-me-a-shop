import { ShopType } from "@/utils/types";
import { FaStar } from "react-icons/fa6";

const CartShopDetails = ({shop} : {shop: ShopType}) => {
    return (
        <div className="w-1/3 mt-6">
            <h1
              className="text-3xl font-bold text-center flex items-center px-6"
            >
              Shop
            </h1>
            <div className="flex flex-col px-6 py-6 bg-teal-50 my-1 rounded-xl hover:bg-teal-100 group transition-all">
              <img
                src={shop.images[0]}
                alt={shop.name}
                className="rounded-xl object-cover"
              />
              <h1 className="text-xl font-semibold mt-3">{shop.name}</h1>
              <div className="flex mt-2 items-center justify-center md:justify-start">
                <span className="text-sm font-semibold flex items-center">
                  {shop.locality}&nbsp;|&nbsp;
                </span>
                <span className="flex items-center">
                  {Array.from({ length: shop.rating }).map((_, idx) => (
                    <FaStar className="fill-orange-400 inline" key={idx} />
                  ))}
                </span>
              </div>
              <div className="mt-2 text-sm">{shop.address}</div>
            </div>
          </div>
    )
}

export default CartShopDetails;