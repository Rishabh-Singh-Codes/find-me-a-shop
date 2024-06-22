// import { useDispatch } from "react-redux";
// import { addItem } from "../utils/cartSlice";

import { ItemSchema } from "@/utils/types";

type Props = {
  items: ItemSchema[];
};

const ItemList = ({ items }: Props) => {
  //   const dispatch = useDispatch();

  //   const handleAddItem = (item) => {
  //     dispatch(addItem(item));
  //   };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between my-4 py-5 border-b"
          data-testid="foodItem"
        >
          <div className="flex flex-col w-3/5">
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm">{item.price}</div>
            <div className="text-xs">{item.description}</div>
          </div>
          <div className="w-3/12 flex justify-end">
            <div>
              {item.image && (
                <div className="absolute">
                  <button
                    className="bg-white text-teal-600 font-semibold relative left-3 md:left-8 top-20 md:top-28 px-2 rounded-lg border-2 border-teal-600"
                    //   onClick={() => handleAddItem(item)}
                  >
                    ADD +
                  </button>
                </div>
              )}
              {item?.image?.length === 0 && (
                <div className="flex items-center mr-2 md:mr-7">
                  <button
                    className="bg-white text-teal-600 px-2 font-semibold rounded-lg border-2 border-teal-600"
                    //   onClick={() => handleAddItem(item)}
                  >
                    ADD +
                  </button>
                </div>
              )}
              {item.image && (
                <img
                  className="w-full h-24 md:h-32 object-cover rounded-lg"
                  src={item.image}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
