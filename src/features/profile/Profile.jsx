import React, { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchUserProfileAsync, selectUser } from "./profileSlice";
import CryptoJS from 'crypto-js';

const generateUniqueIdentifier = (id) => {
  const hash = CryptoJS.SHA256(id).toString(CryptoJS.enc.Hex);
  let largeNumber = parseInt(hash.substring(0, 16), 16); 
  if (largeNumber < 0) {
    largeNumber *= -1;
  }
  
  const base = 10 ** 6;
  const uniqueIdentifier = (largeNumber % base).toString().padStart(6, '0');
  
  return uniqueIdentifier;
};

function Profile() {
  let ContactInfo = [
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b78e",
      },
      name: "आधार नंबर",
      type: "number",
      placeholder: "अपना आधार नंबर दर्ज करें",
      label: "आधार नंबर",
      id: "25d2",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b78f",
      },
      name: "प_ह_ संख्या",
      type: "number",
      placeholder: "अपना पी.एच. नंबर दर्ज करें",
      label: "प.ह. संख्या",
      id: "513d",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b790",
      },
      name: "वार्ड क्रमांक",
      type: "number",
      placeholder: "अपना वार्ड नंबर दर्ज करें",
      label: "वार्ड क्रमांक",
      id: "2e1f",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b791",
      },
      name: "मतदान परिचयापत",
      type: "text",
      placeholder: "अपना वोटर आईडी दर्ज करें",
      label: "मतदान परिचय पत्र",
      id: "890a",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b792",
      },
      name: "परिवार ईद",
      type: "text",
      placeholder: "अपनी पारिवारिक आईडी दर्ज करें",
      label: "परिवार ईद",
      id: "7dab",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b793",
      },
      name: "परिवहन लाइसेंस",
      type: "text",
      placeholder: "अपना ड्राइविंग लाइसेंस दर्ज करें",
      label: "परिवहन लाइसेंस",
      id: "c5c8",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b78d",
      },
      name: "मो",
      type: "number",
      placeholder: "अपना विभाग दर्ज करें",
      label: "मो",
      id: "b823",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b794",
      },
      name: "जन्म दिन",
      type: "date",
      placeholder: "अपनी जन्म तिथि दर्ज करें",
      label: "जन्म दिन",
      id: "f5d8",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b796",
      },
      name: "नियुक्ति पटेल",
      type: "text",
      placeholder: "अपना नियुक्त पटेल दर्ज करें",
      label: "नियुक्ति पटेल",
      id: "906f",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b797",
      },
      name: "पुत्र",
      type: "text",
      placeholder: "अपने बेटे का नाम दर्ज करें",
      label: "पुत्र",
      id: "c7a7",
      require: false,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b798",
      },
      name: "पौत्र",
      type: "text",
      placeholder: "अपने पोते का नाम दर्ज करें",
      label: "पौत्र",
      id: "6a6e",
      require: false,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b799",
      },
      name: "पत्नी",
      type: "text",
      placeholder: "अपनी पत्नी का नाम दर्ज करें",
      label: "पत्नी",
      id: "9e62",
      require: false,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b79a",
      },
      name: "भाई",
      type: "text",
      placeholder: "अपने भाई का नाम दर्ज करें",
      label: "भाई",
      id: "fd79",
      require: false,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b79b",
      },
      name: "पुत्री",
      type: "text",
      placeholder: "अपनी बेटी का नाम दर्ज करें",
      label: "पुत्री",
      id: "b2e2",
      require: false,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b79c",
      },
      name: "परिवारिक सदस्य",
      type: "text",
      placeholder: "अपने परिवार के सदस्य का नाम दर्ज करें",
      label: "परिवारिक सदस्य",
      id: "f794",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b79d",
      },
      name: "अन्य",
      type: "text",
      placeholder: "अन्य विवरण दर्ज करें",
      label: "अन्य",
      id: "6701",
    },
  ];
  let PersonalInfo = [
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b77e",
      },
      name: "नाम",
      type: "text",
      placeholder: "अपना नाम दर्ज करें",
      label: "नाम",
      id: "a5b5",
    },

    {
      _id: {
        $oid: "666718ccbdaeab4fb842b77f",
      },
      name: "पिता श्री",
      type: "text",
      placeholder: "अपने पिता का नाम दर्ज करें",
      label: "पिता श्री",
      id: "7be4",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b780",
      },
      name: "दादा श्री",
      type: "text",
      placeholder: "अपने दादा का नाम दर्ज करें",
      label: "दादा श्री",
      id: "32ae",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b781",
      },
      name: "जाति",
      type: "text",
      placeholder: "अपनी जाति दर्ज करें",
      label: "जाति",
      id: "69ed",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b782",
      },
      name: "व्यवसाय",
      type: "text",
      placeholder: "अपना पेशा दर्ज करें",
      label: "व्यवसाय",
      id: "c33c",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b783",
      },
      name: "ग्राम",
      type: "text",
      placeholder: "अपना गाँव दर्ज करें",
      label: "ग्राम",
      id: "2495",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b784",
      },
      name: "पन्यायत",
      type: "text",
      placeholder: "अपनी पंचायत दर्ज करें",
      label: "पन्यायत",
      id: "2231",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b785",
      },
      name: "पोस्ट",
      type: "text",
      placeholder: "अपनी पोस्ट दर्ज करें",
      label: "पोस्ट",
      id: "e77c",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b786",
      },
      name: "थाना",
      type: "text",
      placeholder: "अपना पुलिस स्टेशन दर्ज करें",
      label: "थाना",
      id: "3a10",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b787",
      },
      name: "तहसील",
      type: "text",
      placeholder: "अपनी तहसील दर्ज करें",
      label: "तहसील",
      id: "4377",
    },

    {
      _id: {
        $oid: "666718ccbdaeab4fb842b788",
      },
      name: "टप्पा",
      type: "text",
      placeholder: "अपना टप्पा दर्ज करें",
      label: "टप्पा",
      id: "4b16",
    },

    {
      _id: {
        $oid: "666718ccbdaeab4fb842b78a",
      },
      name: "संभाग",
      type: "text",
      placeholder: "अपना विभाग दर्ज करें",
      label: "संभाग",
      id: "6dc8",
    },
    {
      _id: {
        $oid: "666718ccbdaeab4fb842b789",
      },
      name: "जिला",
      type: "text",
      placeholder: "अपना जिला दर्ज करें",
      label: "जिला",
      id: "e1ef",
    },
    {
      _id: {
        $oid: "6680041877511524890c4b8a",
      },
      name: "पारिवारिक सदस्य का नाम",
      type: "text",
      placeholder: "अपना विभाग दर्ज करें",
      label: "पारिवारिक सदस्य का नाम",
    },
  ];
  let { id } = useParams();
  let dispatch = useDispatch();
  let data = useSelector(selectUser);
  let ref = createRef();
  // let [ takeScreenshot] = useScreenshot({
  //   type: 'image/jpeg',
  //   quality: 1.0,
  // });
  // let [imageLoaded, setImageLoaded] = useState(false);
  // // console.log(image);

  // let download = (image, { name = 'img', extension = 'jpeg' } = {}) => {
  //   let a = document.createElement('a');
  //   a.href = image;
  //   a.download = `${name}.${extension}`;
  //   a.click();
  // };

  // let hideElements = () => {
  //   document.querySelectorAll('.hide-in-screenshot').forEach(element => {
  //     element.style.visibility = 'hidden';
  //   });
  // };

  // let showElements = () => {
  //   document.querySelectorAll('.hide-in-screenshot').forEach(element => {
  //     element.style.visibility = 'visible';
  //   });
  // };

  // let downloadScreenshot = async () => {
  //   if (imageLoaded) {
  //     hideElements();
  //     try {
  //       let img = await takeScreenshot(ref.current);
  //       showElements();
  //       download(img);
  //     } catch (err) {
  //       showElements();
  //       console.error(err);
  //       alert("An error occurred while taking the screenshot.");
  //     }
  //   } else {
  //     alert("Image not loaded. Cannot take screenshot.");
  //   }
  // };

  useEffect(() => {
    dispatch(fetchUserProfileAsync(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   if (data?.imageURL) {
  //     let img = new Image();
  //     img.src = data.imageURL;
  //     img.onload = () => setImageLoaded(true);
  //     img.onerror = () => setImageLoaded(false);
  //   } else {
  //     setImageLoaded(true);
  //   }
  // }, [data]);

  
  let navigate = useNavigate();
  let newData = {};

  data = data?.user;
  if (data) {
    newData["नियुक्ति तिथि"] =
      data["नियुक्ति तिथि"]?.split("-").reverse().join("") || "N/A";
    newData["जन्म दिन"] =
      data["जन्म दिन"]?.split("-").reverse().join("") || "N/A";
  }

  if (data && ContactInfo && PersonalInfo) {
    return (
      <section className="py-1 ">
        <div className="w-full sm:w-full mx-auto ">
          <div
            className="relative flex flex-col min-w-0 break-words w-full  border-0"
            ref={ref}
          >
            <div className="rounded-t bg-white mb-0 px-6">
              <div
                pri
                className="text-center flex justify-between print:hidden hide-in-screenshot"
              >
                <h6 className="text-blueGray-700 text-xl font-bold">
                  {data.नाम} Profile
                </h6>
                <button
                  className="bg-pink-500 print:hidden hide-in-screenshot text-white active:bg-pink-600 font-bold uppercase sm:text-sm lg:text-sm text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={() => window.print()}
                >
                  Print
                </button>
                {/* <button
                  className="bg-pink-500 print:hidden hide-in-screenshot text-white active:bg-pink-600 font-bold uppercase sm:text-sm lg:text-sm text-xs  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={() => downloadScreenshot()}
                >
                  Download
                </button> */}
                <button
                  className="bg-pink-500 print:hidden hide-in-screenshot text-white active:bg-pink-600 font-bold uppercase sm:text-sm lg:text-sm text-xs  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  Edit
                </button>

                <Link
                  to="/search"
                  className="bg-pink-500 print:hidden hide-in-screenshot text-white active:bg-pink-600 font-bold uppercase sm:text-sm lg:text-sm text-xs  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Back
                </Link>
              </div>
            </div>
            <div className="flex-auto px-4 sm:px-10 pt-0 border-black border-2 m-4 rounded-xl">
              <form noValidate>
                <div className="flex flex-wrap">
                  <div className="p-4 w-full" >
                        <div className="flex">
                        <div className="flex items-center justify-start">
                          <label
                            className="uppercase sm:text-sm lg:text-sm text-sm font-bold mt-4 lg:mt-3 mb-2 sm:flex  sm:items-center sm:justify-center flex justify-center items-center"
                            htmlFor="grid-password"
                          >
                            ID
                          </label>
                          <div className="flex sm:h-5 ml-2">
                            {generateUniqueIdentifier(id)?.split("").map((value, index) => (
                              <div
                                key={index} // Added key for list items
                                type="text"
                                maxLength="1"
                                className="border text-center pointer-events-none flex items-center justify-center sm:p-3 sm:text-sm lg:p-3 lg:text-sm font-semibold md:p-3"
                                value={value}
                                readOnly
                              >
                                {value}
                              </div>
                            ))}
                          </div>
                        </div>
                    <div className="flex justify-center -ml-52 w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex items-center  justify-center sm:w-1/4 w-screen md:w-1/4 h-64 sm:h-48 border-gray-300 cursor-pointer"
                      >
                        <div className="pt-5 pb-6">
                          <img
                            src={
                              data.imageURL || "https://via.placeholder.com/150"
                            }
                            alt="Profile"
                            className="rounded-xl sm:h-48 sm:w-48"
                          />
                        </div>
                      </label>
                    </div>
                    
                    </div>
                  </div>

                  {PersonalInfo?.map((item) => (
                    <div
                      className={`flex sm:text-base lg:text-balance text-xs ${
                        item.name === "पारिवारिक सदस्य का नाम"
                          ? " md:w-2/5  sm:w-2/5 lg:w-2/5"
                          : "sm:w-1/5 md:w-1/5 lg:w-1/5"
                      }  gap-2 justify-between w-full mb-4 p-2`}
                      key={item.name}
                    >
                      <label
                        className={`uppercase  font-bold justify-center flex ${
                          item.name === "पारिवारिक सदस्य का नाम"
                            ? "sm:w-full md:w-4/5 lg:w-4/5"
                            : "sm:w-2/3 md:w-2/5 lg:w-2/5"
                        } `}
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <div className="pointer-events-none border-t-2 border-black font-semibold sm:w-full md:w-full flex justify-center   focus:outline-none focus:ring ease-linear transition-all duration-150">
                        <div className="-my-1.5">
                          {data[item.name] || "N/A"}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div
                    className="flex w-full flex-wrap sm:gap-8 md:gap-8 lg:gap-8  sm:text-lg lg:text-balance text-xs 
                  "
                  >
                    {ContactInfo?.slice(0, 6).map((item) => (
                      <div
                        // className={`flex md:w-auto sm:w-auto  gap-0 lg:text-lg  w-full `}
                        className={`flex md:w-auto sm:w-auto  gap-2 lg:text-lg `}
                        key={item.name}
                      >
                        <label
                          className={`uppercase sm:text-sm    lg:items-center mt-1 lg:justify-center sm:items-center sm:justify-center font-bold r flex sm:w-1/2 md:w-1/2  md:p-0`}
                          htmlFor="grid-password"
                        >
                          {item.label}
                        </label>
                        <div className="flex sm:h-10">
                          {data[item.name]?.split("").map((value, index) => (
                            <div
                              // type="text"
                              // maxLength="1"
                              className="border bg-white border-black  sm:flex sm:justify-center sm:items-center md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center text-center pointer-events-none sm:text-base  font-semibold lg:p-4 md:p-3 sm:p-3 "
                              // value={value}
                              key={`${item.name}-${index}`}
                              readOnly
                            >
                              {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {ContactInfo?.slice(7, 8).map((item) => (
                      <div
                        className={`flex md:w-auto sm:w-auto gap-4 lg:text-lg   w-full `}
                        key={item.name}
                      >
                        <label
                          className={`uppercase sm:text-sm   sm:mt-2 lg:items-center lg:justify-center font-bold r flex sm:w-1/2 md:w-2/3  md:p-2`}
                          htmlFor="grid-password"
                        >
                          {item.label}
                        </label>
                        <div className="flex sm:h-10">
                          {newData[item.name]?.split("").map((value, index) => (
                            <div
                              // type="text"
                              // maxLength="1"
                              className="border bg-white border-black  sm:flex sm:justify-center sm:items-center p-10 md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center text-center pointer-events-none  sm:text-lg  font-semibold lg:p-4 md:p-3 sm:p-3"
                              // value={value}
                              key={`${item.name}-${index}`}
                              readOnly
                            >
                              {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between w-screen">
                      {ContactInfo?.slice(8).map((item) => (
                        <>
                          <label
                            // className="flex items-center "
                            className="flex items-center w-40"
                            key={item.name}
                          >
                            {item.label}
                            <input
                              type="checkbox"
                              name="status"
                              checked={data[item.name]}
                              className="sm:ml-1   lg:ml-4 md:ml-2"
                            />
                          </label>
                        </>
                      ))}
                    </div>
                  </div>
                  {/* {ContactInfo?.slice(6,7).map((item) => (
                    <div
                      className={`flex md:w-auto sm:w-auto mt-4 md:mt-6 gap-0 md:ml-2 lg:text-lg lg:m-4  w-full  print:hidden hide-in-screenshot`}
                      key={item.name}
                    >
                      <label
                        className={`uppercase sm:text-sm   md:-mt-1 lg:items-center lg:justify-center font-bold r flex sm:w-1/2 md:w-2/3  md:p-2`}
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <div className="flex  sm:h-5">
                        {data[item.name]?.split("").map((value, index) => (
                          <div
                            // type="text"
                            // maxLength="1"
                            className="border bg-white border-black  flex justify-center items-center text-center pointer-events-none sm:p-0 sm:text-sm  font-semibold lg:p-4 md:p-3"
                            // value={value}
                            key={`${item.name}-${index}`}
                            readOnly
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))} */}
                </div>
                {/* <div className="flex flex-wrap mt-3 md:mt-4 items-center sm:text-sm lg:text-sm sm:gap-4 md:gap-12 lg:gap-14 gap-4 font-bold">
                  
                </div> */}
                <div className=" md:mt-4 flex  justify-between sm:flex-wrap sm:flex-row  sm:w-full sm:mt-4 items-center sm:mb-4 ">
                  {/* <div className="flex justify-between items-center"> */}
                  {/* <h1>Mobile</h1> */}
                  <div className=" mb-3  border-b-2">
                    <label
                      className="flex justify-center items-center uppercase  sm:text-sm lg:text-sm text-sm  font-bold mb-2"
                      htmlFor="grid-password"
                    ></label>
                    <div className="flex sm:h-10 ">
                      {data?.phone1?.split("").map((value, index) => (
                        <div
                          type="text"
                          maxLength="1"
                          className="border text-center  pointer-events-none flex items-center justify-center sm:p-3 sm:text-sm lg:p-3 lg:text-sm font-semibold md:p-3 "
                          value={value}
                          readOnly
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" mb-3  border-b-2">
                    <label
                      className="flex justify-center items-center  uppercase  sm:text-sm lg:text-sm text-sm  font-bold mb-2"
                      htmlFor="grid-password"
                    ></label>
                    <div className="flex sm:h-10 ">
                      {data?.phone2?.split("").map((value, index) => (
                        <div
                          type="text"
                          maxLength="1"
                          className="border text-center   pointer-events-none flex items-center justify-center sm:p-3 sm:text-sm lg:p-3 lg:text-sm font-semibold md:p-3 "
                          value={value}
                          readOnly
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" mb-3  border-b-2">
                    <label
                      className="flex justify-center items-center uppercase  sm:text-sm lg:text-sm text-sm  font-bold mb-2"
                      htmlFor="grid-password"
                    ></label>
                    <div className="flex sm:h-10 ">
                      {data?.phone3?.split("").map((value, index) => (
                        <div
                          type="text"
                          maxLength="1"
                          className="border text-center  pointer-events-none flex items-center justify-center sm:p-3 sm:text-sm lg:p-3 lg:text-sm font-semibold md:p-3 "
                          value={value}
                          readOnly
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="">
        <div
          role="status"
          className="flex items-center justify-center h-screen"
        >
          <svg
            aria-hidden="true"
            class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Profile;
