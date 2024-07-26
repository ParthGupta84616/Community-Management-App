import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SearchUsersAsync, selectquery } from "./searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUserSlash } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  var query = useSelector(selectquery);
  const navigation = useNavigate();

  useEffect(() => {
    if (inputValue.toString().length > 5) {
      dispatch(SearchUsersAsync(inputValue));
    } else {
      dispatch(SearchUsersAsync(null));
    }
  }, [dispatch, inputValue]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 5) {
      dispatch(SearchUsersAsync(inputValue));
    }
  };

  const handleProfile = (id) => {
    setInputValue("");
    dispatch(SearchUsersAsync(null));
    navigation(`/profile/${id}`);
  };
  const isMobile = useMediaQuery({ query: '(max-width: 450px)' });


  return (
    <div className="">
      <div class="relative isolate overflow-hidden bg-gray-900">
        <svg
          class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width="200"
              height="200"
              x="100%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none"></path>
            </pattern>
          </defs>
          <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              stroke-width="0"
            ></path>
          </svg>
          <rect
            width="100%"
            height="100%"
            stroke-width="0"
            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
          ></rect>
        </svg>
        <div
          class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            // style={"clip-path:polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"}
          ></div>
        </div>
        <div class=" flex h-screen items-center justify-center">
          {/* from here */}
          <div className="h-screen ">
            <form className=" mx-auto pt-24   ">
              <div className="flex items-center justify-center w-screen">
                <div className="relative w-2/3 lg:w-1/2">
                  <input
                    type="search"
                    className="block p-2.5 w-full rounded-l-lg text-center  z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search with Phone Number "
                    // value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    onClick={onSubmit}
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
            <div className="mx-auto mt-24  flex flex-col items-center w-full justify-center gap-2 text-gray-900">
              {query ? (
                query?.query.map(
                  (profile, index) => (
                    // <Link to={"/profile/"+profile._id}>
                    <div className="flex gap-3 bg-gray-400 border lg:40 border-gray-300 rounded-xl overflow-hidden items-center lg:h-36 lg:max-w-4xl lg:w-screen m-4">
                      <div className="relative w-32 flex justify-start h-32 flex-shrink-0">
                        <img
                          className="absolute rounded-2xl left-0 top-0 w-full h-full object-cover object-center transition duration-50  px-2 p-2"
                          loading="lazy"
                          src={profile.imageURL || "https://via.placeholder.com/150"}
                          alt="Placeholder"
                        />
                      </div>

                      <div className="flex flex-col justify-start flex-grow p-2">
                        <p className="text-xl font-bold p-2 ">{profile.नाम || "Not Available"}</p>

                        <span className="flex items-center p-1">
                          <FaLocationDot className="text-red-500 mr-2" />
                          <a
                            href="https://amitpachange.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {profile.जिला || "Not Available"}
                          </a>
                        </span>

                        <span className="flex items-center  p-1 ">
                          <FaPhoneAlt className="text-red-500 mr-2" />
                          <a
                            href="https://amitpachange.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {profile.मो || "Not Available"}
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
                        <div onClick={() => handleProfile(profile._id)}>
                          <h1 className="lg:text-lg text-sm font-medium">
                            Go To Profile
                          </h1>
                        </div>
                      </span>
                    </div>
                  )
                  // </Link>
                )
              ) : (
                <div className="lg:text-5xl text-3xl mt-10  font-bold text-gray-300">
                  <FaUserSlash className="lg:ml-14 ml-10" size={isMobile ? 125 : 200} />
                  <h1 className=""> No User Found</h1>
                </div>
              )}
            </div>
            <div class="flex justify-center mt-20">
            <Link
              to={"/register"}
              class="mr-5 inline-block rounded-xl bg-gray-900 px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px] md:mr-6"
            >
              Register
            </Link>
            <Link
              to={"/"}
              class="flex max-w-full flex-row items-center bg-slate-700  justify-center rounded-xl border border-solid border-[#1353fe] px-6 py-3 font-semibold  [box-shadow:rgb(19,_83,_254)_6px_6px]"
            >
              <FaHome class="mr-2 text-[#1353fe]" size={20} />
              <p class="text-blue-700">
                Home
              </p>
            </Link>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Search;
