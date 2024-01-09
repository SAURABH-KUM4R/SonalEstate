import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get('searchTerm');
    if (urlSearchTerm) {
        setSearchTerm(urlSearchTerm);
    }
  }, [location.search]);

  return (
    <header className="bg-gray-500 transition-all duration-300 hover:bg-gray-600 shadow-xl">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
            <span className="text-orange-500">Sonal</span>
            <span className="text-black-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-gray-500 p-3 rounded-lg flex items-center cursor-pointer">
            <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-orange-500" />
          </button>
        </form>
        <ul className="flex gap-4 text-orange-500 text-lg ">
          <Link to={"/"}>
            <li className="hidden sm:inline hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li className="hidden sm:inline cursor-pointer hover:underline">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
