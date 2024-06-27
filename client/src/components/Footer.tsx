import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-orange-400 py-10 relative">
      <div className="container mx-auto flex-auto flex justify-between items-center">
        <span className="text-xl md:text-3xl font-bold tracking-tight">
          Find Me A Coffee Shop
        </span>
        <span className="font-bold tracking-tight gap-4 flex items-center">
          <a href="https://github.com/Rishabh-Singh-Codes/find-me-a-shop">
            <div className="has-tooltip flex flex-col ml-2">
              <span className="tooltip rounded-md -mt-6 -ml-4 p-1 bg-gray-100 text-violet-500 text-xs">
                GitHub 🚀
              </span>

              <FaGithub className="text-2xl" />
            </div>
          </a>
          <p className="cursor-pointer text-xs md:text-base">Privacy Policy</p>
          <p className="cursor-pointer text-xs md:text-base">
            Terms of Service
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
