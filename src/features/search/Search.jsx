import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
function Search() {
  return (
    <div className="h-screen bg-slate-600">
      <form className=" mx-auto pt-24  w-1/2">
        <div className="flex">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Your Email
          </label>
          <div className="relative w-full">
            <input
              type="search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos, Design Templates..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      {/* <div className="w-screen p-10 rounded-lg flex items-center justify-center "> */}
        {/* <div className="flex flex-row w-5/6 h-56 justify-between gap-3  border-2 border-red-700"> */}
        <div className="mx-auto mt-24 flex items-center w-full justify-center">
            <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center lg:h-36 lg:max-w-4xl w-screen">
                <div className="relative w-32 flex justify-start h-32 flex-shrink-0">
                    <img
                        className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50 rounded-lg px-2 p-2"
                        loading="lazy"
                        src="https://via.placeholder.com/150"
                        alt="Placeholder"
                    />
                </div>

                <div className="flex flex-col justify-start flex-grow p-2">
                    <p className="text-xl font-bold p-2">Name</p>

                    <span className="flex items-center text-gray-500 p-1">
                        <FaLocationDot className="text-red-500" />
                        <a href="https://amitpachange.com" target="_blank" rel="noopener noreferrer">
                            District
                        </a>
                    </span>

                    <span className="flex items-center text-gray-500 p-1">
                        <FaPhoneAlt className="text-red-500" />
                        <a href="https://amitpachange.com" target="_blank" rel="noopener noreferrer">
                            Phone Number
                        </a>
                    </span>
                </div>
                <span className="flex justify-end items-center pr-3">
                        <svg
                            className="w-4 h-4 mr-1 mt-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <a href="https://amitpachange.com" target="_blank" rel="noopener noreferrer">
                            <h1 className="text-lg font-medium">Go To Profile</h1>
                        </a>
                      </span>
            </div>
        </div>
        </div>
    //   </div>
    // </div>
  );
}

export default Search;
