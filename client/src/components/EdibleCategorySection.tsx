import { FiCoffee } from "react-icons/fi";
import { LuCupSoda } from "react-icons/lu";
import { LuCroissant } from "react-icons/lu";

type Props = { category: string; setCategory: (category: string) => void };

const EdibleCategorySection = ({ category, setCategory }: Props) => {
  return (
    <div className="flex mt-6 justify-between">
      <div
        onClick={() => setCategory("coffee")}
        className={`flex flex-col ${
          category === "coffee" ? "bg-teal-300 shadow-xl" : "bg-teal-100"
        } p-6 items-center min-w-24 md:min-w-32 rounded-3xl hover:cursor-pointer hover:text-teal-950 hover:shadow-xl transition`}
      >
        <FiCoffee className="text-5xl" />
        <span className="text-2xl font-semibold">Coffee</span>
      </div>

      <div
        onClick={() => setCategory("drink")}
        className={`flex flex-col ${
          category === "drink" ? "bg-teal-300 shadow-xl" : "bg-teal-100"
        } p-6 items-center min-w-24 md:min-w-32 rounded-3xl hover:cursor-pointer hover:text-teal-950 hover:shadow-xl transition`}
      >
        <LuCupSoda className="text-5xl" />
        <span className="text-2xl font-semibold">Drinks</span>
      </div>

      <div
        onClick={() => setCategory("food")}
        className={`flex flex-col ${
          category === "food" ? "bg-teal-300 shadow-xl" : "bg-teal-100"
        } p-6 items-center min-w-28 md:min-w-32 rounded-3xl hover:cursor-pointer hover:text-teal-950 hover:shadow-xl transition`}
      >
        <LuCroissant className="text-5xl" />
        <span className="text-2xl font-semibold">Food</span>
      </div>
    </div>
  );
};

export default EdibleCategorySection;
