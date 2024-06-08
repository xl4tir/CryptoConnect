import React, { useContext, useState, Fragment } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { FiPower } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";
import { AuthContext } from "../../context/authContext";
import { EthersConnectContext } from "../../context/EthersConnectContext";
import logo from "../../images/Logo.svg";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentAccount } = useContext(TransactionContext);
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { connectWallet, loading, disconnectWallet } = useContext(EthersConnectContext);

  return (
    <nav className="w-full flex lg:justify-center justify-between items-center p-4">
      <div className="mr-40 text-white flex flex-initial justify-center items-center flex-row">
        <img src={logo} alt="logo" className="w-10 cursor-pointer" />
        <p className="mx-4 tracking-wide text-xl font-bold">CryptoConnect</p>
      </div>
      <ul className="text-white lg:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "SendTo", "Swap"].map((item, index) => (
          <li key={item + index}>
            <Link to={`/${item.toLowerCase()}`} className="text-white m-4 hover:text-gray-300">
              {item}
            </Link>
          </li>
        ))}

        {isLoggedIn && currentAccount ? (
          <>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-transparent py-2 px-2 ml-4 border border-[#A90E8F] text-white hover:bg-[#A90E8F]">
                  Profile

                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute  right-0 z-10 mt-2 w-36 origin-top-right rounded-md  shadow-lg ring-1 ring-gray-400 ring-opacity-50 focus:outline-none blue-glassmorphism-nav">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? 'rounded-md bg-white/5 text-white' : 'text-white',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/portfolio-tracker/${user._id}`}
                          className={classNames(
                            active ? 'rounded-md bg-white/5 text-white' : 'text-white',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Portfolio
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <li className="bg-[#A90E8F] py-3 px-3 ml-8 rounded-full cursor-pointer hover:bg-[#930C7C]" onClick={disconnectWallet}>
              <FiPower></FiPower>
            </li>
          </>
        ) : (
          <>
            {!currentAccount && (
              <li
                onClick={connectWallet}
                className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Connect Wallet'}
              </li>
            )}
          </>
        )}
      </ul>

      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white lg:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white lg:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl lg:hidden list-none
            flex flex-col justify-start items-end rounded-lg blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "SendTo", "Swap"].map((item, index) => (
              <li key={item + index}>
                <Link to={`/${item.toLowerCase()}`} className="text-white my-2 text-lg">{item}</Link>
              </li>
            ))}
            {isLoggedIn && currentAccount ? (
              <>
                <li className="text-white my-2 text-lg">
                  <Link to={`/profile`}>Profile</Link>
                </li>
                <li className="text-white my-2 text-lg">
                  <Link to={`/portfolio`}>Portfolio</Link>
                </li>
                <li className="text-white my-2 text-lg" onClick={disconnectWallet}>
                  Exit
                </li>
              </>
            ) : (
              <>
                {!currentAccount && (
                  <li className="text-white my-2 text-lg" onClick={connectWallet} disabled={loading}>
                    {loading ? 'Loading...' : 'Connect Wallet'}
                  </li>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
