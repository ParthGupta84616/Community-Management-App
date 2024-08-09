import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchUserProfileAsync, selectUser } from "./profileSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

const extractDateParts = (dateStr) => {
  const [year, month, day] = dateStr?.split("-");
  return {
    day: day,
    month: month,
    year: year.slice(-2),
  };
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
      label: "प.ह.नं.",
      id: "513d",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b790",
      },
      name: "वार्ड क्रमांक",
      type: "number",
      placeholder: "अपना वार्ड नंबर दर्ज करें",
      label: "वार्ड नं.",
      id: "2e1f",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b791",
      },
      name: "मतदाता परिचयपत्र",
      type: "text",
      placeholder: "अपना वोटर आईडी दर्ज करें",
      label: "मतदाता परिचयपत्र",
      id: "890a",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b792",
      },
      name: "परिवार आईडी",
      type: "text",
      placeholder: "अपनी पारिवारिक आईडी दर्ज करें",
      label: "परिवार आईडी",
      id: "7dab",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b793",
      },
      name: "ड्राइविंग लाइसेंस",
      type: "text",
      placeholder: "अपना ड्राइविंग लाइसेंस दर्ज करें",
      label: "ड्राइविंग लाइसेंस",
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
      name: "जन्म दिन दिनांक",
      type: "date",
      placeholder: "अपनी जन्म तिथि दर्ज करें",
      label: "जन्म दिनांक",
      id: "f5d8",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b796",
      },
      name: "नियुक्ति पटेल",
      type: "text",
      placeholder: "अपना नियुक्त पटेल दर्ज करें",
      label: "नियुक्त पटेल",
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
      name: "पारिवारिक सदस्य",
      type: "text",
      placeholder: "अपने परिवार के सदस्य का नाम दर्ज करें",
      label: "पारिवारिक सदस्य",
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
      name: "पिताश्री",
      type: "text",
      placeholder: "अपने पिता का नाम दर्ज करें",
      label: "पिताश्री",
      width: "1/5",
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
      width: "1/5",
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
      width: "1/5",
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
      width: "custom-6",
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
      name: "पंचायत",
      type: "text",
      placeholder: "अपनी पंचायत दर्ज करें",
      label: "पंचायत",
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
      name: "उपतहसील",
      type: "text",
      placeholder: "अपना उपतहसीलदर्ज करें",
      label: "उपतहसील",
      id: "4b16",
    },

    {
      _id: {
        $oid: "666718ccbdaeab4fb842b78a",
      },
      name: "जनपद",
      type: "text",
      placeholder: "अपना विभाग दर्ज करें",
      label: "जनपद",
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
      name: "पारिवारिक सदस्य पटेल के उत्तराधिकारी का नाम",
      type: "text",
      placeholder: "पारिवारिक सदस्य पटेल दर्ज करें",
      label: "पारिवारिक सदस्य पटेल के उत्तराधिकारी का नाम",
    },
    {
      _id: {
        $oid: "6680041877511524890c4b8h",
      },
      name: "पारिवारिक सदस्य पटेल के उत्तराधिकारी का नाम ( नाम )",
      type: "text",
      placeholder: "पारिवारिक सदस्य पटेल दर्ज करें ( नाम )",
      label: "पारिवारिक सदस्य पटेल के उत्तराधिकारी का नाम ( नाम )",
    },
  ];
  let { id } = useParams();
  let dispatch = useDispatch();
  let data = useSelector(selectUser);
  let ref = createRef();
  const [icon, setIcon] = useState(false)

  useEffect(() => {
    dispatch(fetchUserProfileAsync(id));
  }, [dispatch, id]);

  let navigate = useNavigate();
  let newData = {};

  data = data?.user;
  if (data) {
    newData["नियुक्ति तिथि"] =
      data["नियुक्ति तिथि"]?.split("-").reverse().join("") || "N/A";
    newData["जन्म दिन दिनांक"] =
      data["जन्म दिन दिनांक"]?.split("-").reverse().join("") || "N/A";
  }
  console.log(data);

  if (data && ContactInfo && PersonalInfo) {
    return (
      <section className="py-1 font-semibold text-base">
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
                <h6 className="text-blueGray-700 text-xl ">
                  {data.नाम} Profile
                </h6>
                <button
                  className="bg-pink-500 print:hidden hide-in-screenshot text-white active:bg-pink-600  uppercase sm:text-sm lg:text-sm text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={() => window.print()}
                >
                  Print
                </button>
                <button
                  className="bg-pink-500 print:hidden hide-in-screenshot text-white active:bg-pink-600  uppercase sm:text-sm lg:text-sm text-xs  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  Edit
                </button>

                <Link
                  to="/search"
                  className="bg-pink-500 print:hidden hide-in-screenshot text-white active:bg-pink-600  uppercase sm:text-sm lg:text-sm text-xs  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Back
                </Link>
              </div>
            </div>
            <div className="flex-auto px-4 sm:px-3 pt-0 border-black border-2 m-4 rounded-xl">
              <form noValidate className="m-1">
                <div className="flex flex-wrap">
                  <div className="p-4 w-full">
                    <div className="flex">
                      <div className="flex-col  justify-start">
                        <div className="flex">
                          <label
                            className="uppercase  mt-1 mb-2 sm:flex   sm:justify-center flex justify-cent"
                            htmlFor="grid-password"
                          >
                            क्र
                          </label>
                          <div className="flex sm:h-5 ml-2">
                            {(data.क्रमंक === " - " ? "000000" : data.क्रमंक)
                              ?.split("")
                              .map((value, index) => (
                                <div
                                  key={index} // Added key for list items
                                  type="text"
                                  maxLength="1"
                                  className="border text-center pointer-events-none flex items-center justify-center sm:p-3 lg:p-3 md:p-3"
                                  value={value}
                                  readOnly
                                >
                                  {value}
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="flex m-4">
                          {icon ? (
                            <div className="flex w-full h-full"
                            onClick={() => setIcon(false)}
                            >
                              <CheckCircleOutlineIcon 
                              sx={{ height: 50, width: 50 }}
                              onClick={() => setIcon(false)}
                            />
                            </div>
                          ) : (
                            <div className="flex w-full h-full"
                            onClick={() => setIcon(true)}
                            >
                              <PanoramaFishEyeIcon
                              sx={{ height: 50, width: 50 }}
                              onClick={() => setIcon(true)}
                            />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center mt-2 mx-8 w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex items-center   sm:w-1/4 w-screen md:w-1/4 h-52 sm:h-48 ml-72 border-gray-300 cursor-pointer"
                        >
                          <div className="flex -mx-52">
                            <img
                              src={
                                data.imageURL ||
                                "https://via.placeholder.com/150"
                              }
                              alt="Profile"
                              className="rounded-xl sm:h-36 sm:w-32 "
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {PersonalInfo?.slice(0, 13).map((item) => (
                    <div
                      className={`flex ${
                        item.width
                          ? item.name === "व्यवसाय"
                            ? "w-custom-6"
                            : item.name === "दादा श्री"
                            ? "w-custom-10.5"
                            : item.name === "पिताश्री"
                            ? "w-custom-10"
                            : "w-custom-8"
                          : "sm:w-1/4 md:w-1/4 lg:w-1/4"
                      } gap-2 justify-between mb-4 p-1`}
                      key={item.name}
                    >
                      <label
                        className={`lassName=uppercase    flex sm:flex -mt-1.5 ${
                          item.name === "दादा श्री"
                          // ? "sm:w-3/5 md:w-3/5 lg:w-3/5"
                          // : "sm:w-2/5 md:w-2/5 lg:w-2/5"
                        }


                            `}
                        style={{
                          whiteSpace: "nowrap",
                        }}
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <div
                        className="pointer-events-none border-t-1 border-gray-400  
                      sm:w-full
                      
                      //  md:w-full 
                       flex justify-center focus:outline-none focus:ring ease-linear transition-all duration-150"
                      >
                        <div
                          className="-my-1.5
                          //  w-5/6
                           text-center"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {data[item.name] || "-"}
                        </div>
                      </div>
                    </div>
                  ))}

                  {PersonalInfo?.slice(13, 14).map((item) => (
                    <div
                      className={`flex md:w-full lg:w-full"
                       gap-2 justify-between w-full mb-4 p-1`}
                      key={item.name}
                    >
                      <label
                        className={`uppercase   flex"
                        } `}
                        htmlFor="grid-password"
                      >
                        {item.label} &nbsp;:-&nbsp; नाम
                      </label>
                      <div className="pointer-events-none border-t-1 border-gray-400  sm:w-1/4 flex justify-center   focus:outline-none focus:ring ease-linear transition-all duration-150">
                        <div className="-my-1.5">{data[item.name] || "-"}</div>
                      </div>
                      <div className="  sm:w-1/3 md:w-full flex  focus:outline-none focus:ring ease-linear transition-all duration-150">
                        (&nbsp;&nbsp;
                        <div className=" border-t-1 flex items-center justify-center  border-gray-400  sm:w-1/2    focus:outline-none focus:ring ease-linear transition-all duration-150">
                          <div className="text-center w-5/6 -mt-3 bg-transparent">
                            {data[PersonalInfo[14].name] || "-"}
                          </div>
                        </div>
                        &nbsp;&nbsp; )
                      </div>
                    </div>
                  ))}

                  <div
                    className="flex w-full flex-wrap sm:gap-4.5 md:gap-4 lg:gap-3 
                  "
                  >
                    {ContactInfo?.slice(0, 6).map((item) => (
                      <div
                        className={`flex md:w-auto sm:w-auto  gap-4 md:gap-2  `}
                        key={item.name}
                      >
                        <label
                          className={`uppercase    lg:items-center mt-1 lg:justify-center sm:items-center sm:justify-center  r flex sm:w-1/2 md:w-1/2  md:p-0`}
                          htmlFor="grid-password"
                        >
                          {item.label}
                        </label>
                        <div className="flex sm:h-9">
                          {data[item.name]?.split("").map((value, index) => (
                            <div
                              // type="text"
                              // maxLength="1"
                              className="border bg-white border-black  sm:flex sm:justify-center sm:items-center md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center text-center pointer-events-none  lg:p-3 md:p-3 sm:p-3 "
                              // value={value}
                              key={`${item.name}-${index}`}
                              readOnly
                            >
                              {value === " " ? <>&nbsp;&nbsp;</> : value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {ContactInfo?.slice(7, 8).map((item) => (
                      <div
                        className={`flex md:w-auto sm:w-auto gap-4   w-full `}
                        key={item.name}
                      >
                        <label
                          className={`uppercase   sm:mt-2 lg:items-center lg:justify-center  r flex sm:w-1/2 md:w-2/3  md:p-2`}
                          htmlFor="grid-password"
                        >
                          {item.label}
                        </label>
                        <div className="flex sm:h-9">
                          {newData[item.name]?.split("").map((value, index) => (
                            <React.Fragment key={`${item.name}-${index}`}>
                              <div
                                className="border bg-white border-black sm:flex sm:justify-center sm:items-center p-10 md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center text-center pointer-events-none lg:p-4 md:p-3 sm:p-2.5"
                                readOnly
                              >
                                {value === " " ? <>&nbsp;&nbsp;</> : value}
                              </div>
                              {(index === 1 || index === 3) && (
                                <>&nbsp;&nbsp;</>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between w-screen ">
                      {ContactInfo?.slice(8).map((item) => (
                        <>
                          <label
                            // className="flex items-center "
                            className="flex items-center "
                            key={item.name}
                          >
                            {item.label}
                            <input
                              type="checkbox"
                              name="status"
                              checked={data[item.name]}
                              className="ml-2 size-5 sm:size-7"
                            />
                          </label>
                        </>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="  flex mt-10  justify-between sm:flex-wrap sm:flex-row  sm:w-full sm:mt-3 items-center sm:mb-4 mdLmb-4 ">
                  <div className="   border-b-2">
                    <div className="flex sm:h-9 ">
                      <label className="flex justify-center items-center   sm:text-base lg:text-sm text-base mr-4 ">
                        मो.
                      </label>

                      {data?.phone1?.split("").map((value, index) => (
                        <div
                          type="text"
                          maxLength="1"
                          className="border text-center  pointer-events-none flex items-center justify-center sm:p-2.5 sm:text lg:p-2.5 lg:text-sm md:text-sm  md:p-2.5 "
                          value={value}
                          readOnly
                        >
                          {value === " " ? <>&nbsp;</> : value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="   border-b-2">
                    <label
                      className="flex justify-center items-center  uppercase  mb-2"
                      htmlFor="grid-password"
                    ></label>
                    <div className="flex sm:h-9 ">
                      {data?.phone2?.split("").map((value, index) => (
                        <div
                          type="text"
                          maxLength="1"
                          className="border text-center   pointer-events-none flex items-center justify-center sm:p-2.5 lg:p-2.5   md:p-2.5 "
                          value={value}
                          readOnly
                        >
                          {value === " " ? <>&nbsp;</> : value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="   border-b-2">
                    <label
                      className="flex justify-center items-center uppercase    mb-2"
                      htmlFor="grid-password"
                    ></label>
                    <div className="flex sm:h-9 ">
                      {data?.phone3?.split("").map((value, index) => (
                        <div
                          type="text"
                          maxLength="1"
                          className="border text-center  pointer-events-none flex items-center justify-center sm:p-2.5 lg:p-2.5   md:p-2.5 "
                          value={value}
                          readOnly
                        >
                          {value === " " ? <>&nbsp;</> : value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between  mb-4">
                  <div className="flex items-center justify-center sm:items-center   sm:justify-center ">
                    <h1>उपस्थिति :-</h1>
                  </div>
                  {data?.उपस्थित?.map((item, index) => (
                    <div
                    key={index}
                    className="flex flex-col h-14 w-20 border border-black"
                  >
                    <div className="flex flex-1 items-center justify-center border-b-2">
                      {data && data.inputsअंक ? data.inputsअंक[index] : '\u00A0'}
                    </div>
                    <div className="flex justify-between flex-1">
                      <div className="w-1/3 p-0 border-t border-black flex items-center justify-center">
                        {data && data.inputsअंक && item ? extractDateParts(item).day : '\u00A0'}
                      </div>
                      <div className="w-1/3 p-0 border-r border-l border-t border-black flex items-center justify-center">
                        {data && data.inputsअंक && item ? extractDateParts(item).month : '\u00A0'}
                      </div>
                      <div className="w-1/3 p-0 border-t border-black flex items-center justify-center">
                        {data && data.inputsअंक && item ? extractDateParts(item).year : '\u00A0'}
                      </div>
                    </div>
                  </div>
                  ))}
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