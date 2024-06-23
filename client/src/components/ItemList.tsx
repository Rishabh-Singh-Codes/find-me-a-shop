import { useDispatch, useSelector } from "react-redux";
import { ItemSchema } from "@/utils/types";
import { addItem } from "@/store/cartSlice";
import { RootStateType } from "@/store/store";
import { showToast } from "@/store/toastSlice";
import { GrSquare } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  items: ItemSchema[];
  shopId?: string;
  category?: string;
};

const ItemList = ({ items, shopId, category }: Props) => {
  const {
    cart: { store },
    auth: { isLoggedIn },
  } = useSelector((state: RootStateType) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddItem = (item: ItemSchema) => {
    console.log("item", item);

    if (!isLoggedIn) {
      dispatch(
        showToast({
          message: "Please sign in to add items",
          type: "ERROR",
        })
      );
      navigate("/sign-in", { state: { from: location.pathname } });
    }

    if (isLoggedIn && store && shopId !== store) {
      dispatch(
        showToast({
          message: "Items from different store present in cart",
          type: "ERROR",
        })
      );
    }

    dispatch(
      addItem({
        item: { itemId: item._id, itemName: item.name, itemPrice: item.price, itemCategory: category },
        store: shopId,
      })
    );
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between my-4 py-5 border-b"
          data-testid="foodItem"
        >
          <div className="flex flex-col w-3/5">
            <div className="font-semibold flex items-center">
              {item.name}{" "}
              {item.isVeg ? (
                <div className="has-tooltip flex flex-col ml-2">
                  <span className="tooltip rounded-md -mt-6 -ml-2 p-1 bg-gray-100 text-green-500 text-xs">
                    Veg
                  </span>
                  <GrSquare className="text-green-500 inline" />
                </div>
              ) : (
                <div className="has-tooltip flex flex-col ml-2">
                  <span className="tooltip rounded-md -mt-6 -ml-6 p-1 bg-gray-100 text-rose-500 text-xs">
                    Non-Veg
                  </span>
                  <GrSquare className="text-rose-500 inline" />
                </div>
              )}
            </div>
            <div className="text-sm">{item.price}</div>
            <div className="text-xs">{item.description}</div>
          </div>
          <div className="w-3/12 flex justify-end">
            <div>
              {item.image && (
                <div className="absolute">
                  <button
                    className="bg-white text-teal-600 font-semibold relative left-3 md:left-8 top-20 md:top-28 px-2 rounded-lg border-2 border-teal-600"
                    onClick={() => handleAddItem(item)}
                  >
                    ADD +
                  </button>
                </div>
              )}
              {item?.image?.length === 0 && (
                <div className="flex items-center mr-2 md:mr-7">
                  <button
                    className="bg-white text-teal-600 px-2 font-semibold rounded-lg border-2 border-teal-600"
                    onClick={() => handleAddItem(item)}
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
