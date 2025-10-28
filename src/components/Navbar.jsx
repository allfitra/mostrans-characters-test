import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogoMostrans } from "../assets";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const location = useLocation();

  const navigationList = [
    { name: "Home", href: "/" },
    { name: "Character By Location", href: "/location" },
  ];

  const navigation = navigationList.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  useEffect(() => {
    window.scrollTo(1, 0);
  }, [location.pathname]);

  return (
    <>
      <WebNavbar navigation={navigation} location={location} />
      <MobileNavbar navigation={navigation} />
    </>
  );
};

const WebNavbar = ({ navigation, location }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <nav
      className={classNames(
        "fixed top-0 z-50 hidden h-[80px] w-full transition duration-200 md:block",
        scrolled || !isHome ? "bg-[#01663f] shadow-md" : "bg-transparent"
      )}
    >
      <div className="flex justify-center">
        <div className="flex h-20 w-full max-w-7xl items-center justify-around px-10 text-white">
          <Link to="/">
            <img
              className="h-[80px] w-[100px]"
              src={LogoMostrans}
              alt="Mostrans Logo"
              style={{ aspectRatio: "1 / 1", height: "80px", width: "80px" }}
            />
          </Link>

          <div className="flex items-center space-x-6 mt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  "text-sm px-3 py-2 rounded-md transition duration-300",
                  item.current
                    ? "font-bold text-[#fbd600]"
                    : "hover:text-[#fbd600]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {(scrolled || !isHome) && (
        <div className="flex justify-center">
          <hr className="w-[90%] border-t-2 border-[#fbd600]" />
        </div>
      )}
    </nav>
  );
};

const MobileNavbar = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 block h-[95px] w-full bg-[#01663f] shadow-md text-white md:hidden">
      <div className="flex justify-between items-center px-6 h-full">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img
            className="h-[70px] w-[80px] mt-2"
            src={LogoMostrans}
            alt="Mostrans Logo"
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col items-center justify-center h-10 w-10"
        >
          <span
            className={classNames(
              "mb-2 block h-0.5 w-8 bg-white transition-transform duration-300",
              isOpen && "translate-y-2 rotate-45"
            )}
          ></span>
          <span
            className={classNames(
              "mb-2 block h-0.5 w-8 bg-white transition-opacity duration-300",
              isOpen && "opacity-0"
            )}
          ></span>
          <span
            className={classNames(
              "block h-0.5 w-8 bg-white transition-transform duration-300",
              isOpen && "-translate-y-3 -rotate-45"
            )}
          ></span>
        </button>
      </div>
      <hr className="w-full border-t-2 border-[#fbd600]" />
      <div
        className={classNames(
          "overflow-hidden bg-[#01663f] transition-all duration-500 text-center",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              "block px-4 py-3 text-sm text-white transition duration-300",
              item.current ? "font-bold bg-[#014f30]" : "hover:bg-[#014f30]"
            )}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
