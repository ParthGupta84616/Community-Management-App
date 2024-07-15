import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createAccountAsync,
} from "./registerSlice";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ImageCompressor from "image-compressor.js";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      digit: 12,
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
      digit: 3,
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
      digit: 2,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b791",
      },
      name: "मतदाता परिचयपत्र",
      type: "number",
      placeholder: "अपना वोटर आईडी दर्ज करें",
      label: "मतदाता परिचयपत्र",
      id: "890a",
      digit: 10,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b792",
      },
      name: "परिवार आईडी",
      type: "number",
      placeholder: "अपनी पारिवारिक आईडी दर्ज करें",
      label: "परिवार आईडी",
      id: "7dab",
      digit: 10,
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b793",
      },
      name: "ड्राइविंग लाइसेंस",
      type: "number",
      placeholder: "अपना ड्राइविंग लाइसेंस दर्ज करें",
      label: "ड्राइविंग लाइसेंस",
      id: "c5c8",
      digit: 10,
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
      label: "जन्म दिन दिनांक",
      id: "f5d8",
      digit: "8",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b796",
      },
      name: "नियुक्ति पटेल",
      type: "boolean",
      placeholder: "अपना नियुक्त पटेल दर्ज करें",
      label: "नियुक्ति पटेल",
      id: "906f",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b797",
      },
      name: "पुत्र",
      type: "boolean",
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
      type: "boolean",
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
      type: "boolean",
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
      type: "boolean",
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
      type: "boolean",
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
      type: "boolean",
      placeholder: "अपने परिवार के सदस्य का नाम दर्ज करें",
      label: "पारिवारिक सदस्य",
      id: "f794",
    },
    {
      _id: {
        $oid: "666718d8bdaeab4fb842b79d",
      },
      name: "अन्य",
      type: "boolean",
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
      name: "पारिवारिक सदस्य पटेल के उत्तराधिकारी का नाम",
      type: "text",
      placeholder: "पारिवारिक सदस्य पटेल दर्ज करें",
      label: "पारिवारिक सदस्य पटेल के उत्तराधिकारी का नाम",
    },
  ];
  // const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  // console.log(ContactInfo, PersonalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    // const preprocessData = (data) => {
    //   let processedData = { ...data };
    //   for (const key in processedData) {
    //     if (typeof processedData[key] === 'string' && processedData[key].trim() === "") {
    //       processedData[key] = "N/A";
    //     }
    //   }
    //   console.log(processedData)
    //   return processedData;
    // };    
    const processedData = data;
    processedData["imageURL"] = url || "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc";
    setUrl(null); 
    dispatch(createAccountAsync(processedData));
    reset();
  };
  

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      // Create an instance of ImageCompressor
      const compressor = new ImageCompressor();

      // Compress the file
      compressor
        .compress(file, {
          quality: 0.2, // Adjust the quality as needed
          maxWidth: 800, // Maximum width of the output image
          maxHeight: 600, // Maximum height of the output image
          convertSize: 50000, // Limit in bytes for converting to a Blob
        })
        .then((compressedFile) => {
          // Once compressed, proceed with uploading the compressed file
          const storageRef = ref(storage, `images/${compressedFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, compressedFile);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Handle progress, pause, and resume
            },
            (error) => {
              console.error("Upload failed:", error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log('File available at', downloadURL);
                setUrl(downloadURL || "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc");
              });
            }
            
          );
        })
        .catch((error) => {
          console.error("Compression error:", error);
        });
    }
  };

  if (ContactInfo && PersonalInfo) {
    return (
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-11/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Create Profile
                </h6>
                <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap">
                  <div
                    className="flex items-center justify-center w-full p-4 flex-col lg:flex-row gap-4"
                    style={{ margin: "1rem" }}
                  >
                    <label
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2 flex justify-center items-center w-1/2"
                      htmlFor="grid-password"
                    >
                      फ़ोटो
                    </label>
                    {url ? (
                      <>
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center lg:w-1/3 w-full md:w-1/2 h-64 border-2 border-dashed bg-slate-500 rounded-3xl border-gray-300 cursor-pointer dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col  items-center justify-center pt-5 pb-6">
                          <img
                            src={url}
                            alt="profileURL"
                            className="size-64 rounded-lg"
                          />
                        </div>
                        
                      </label>
                      <button
                      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setUrl(null)}
                    >
                      Remove Photo
                    </button></>
                      
                    ) : (
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                  {PersonalInfo?.map((item) => (
                    <div
                      className="relative lg:w-3/12 w-full mb-3 px-4"
                      key={item.name}
                    >
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        placeholder={item.placeholder}
                        {...register(item.name, {
                          setValueAs: value => value ? value : "N/A"
                        })}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {errors[item.name] && <p>This field is required</p>}
                    </div>
                  ))}
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  {ContactInfo?.slice(0, 8).map((item) => (
                    <div
                      className="relative lg:w-3/12 w-full mb-3 px-4"
                      key={item.name}
                    >
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        placeholder={item.placeholder}
                        {...register(item.name, {
                          required: item.name === 'मो',
                          setValueAs: value => {
                            if (item.type === 'date' || item.type === 'number') {
                              if (value === "" || value.length !== item.digit) {
                                let newValue = value;
                                // Adjust the value to meet the length criteria
                                while (newValue.length < item.digit) {
                                  newValue += " "; // Append spaces if shorter
                                }
                                if (newValue.length > item.digit) {
                                  newValue = newValue.substring(0, item.digit); // Trim if longer
                                }
                                return newValue;
                              } else {
                                return value; // Return the value as is if it meets the criteria
                              }
                            } else {
                              return value; // For 'date' type, always return the value as is
                            }
                            
                          }
                        })}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {errors[item.name] && <p>This field is required</p>}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap mt-8 items-center mb-4 gap-11">
                  <label className="w-32 ">स्थिति पॅटर्न:</label>
                  {ContactInfo?.slice(8).map((item) => (
                    // <div className="flex justify-b">
                      <label className="flex items-center w-auto" key={item.name}>
                      <input
                        type="checkbox"
                        name="status"
                        {...register(item.name)}
                        className="mr-2"
                      />
                      {item.label}
                    </label>
                    // </div>
                  ))}
                </div>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  मो
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <input
                        type="text"
                        {...register("phone1", {
                          setValueAs: (value) => {
                            if (value.length === 9 || value.length === 10) {
                              return value;
                            } else {
                              return value.padEnd(10, " ");
                            }
                          }
                        })}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("phone2", {
                          setValueAs: (value) => {
                            if (value.length === 9 || value.length === 10) {
                              return value;
                            } else {
                              return value.padEnd(10, " ");
                            }
                          }
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <input
                        type="text"
                        {...register("phone3", {
                          setValueAs: (value) => {
                            if (value.length === 9 || value.length === 10) {
                              return value;
                            } else {
                              return value.padEnd(10, " ");
                            }
                          }
                        })}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300 " />

                <div className="flex items-center justify-center p-10 mt-10">
                  <input
                    type="submit"
                    className="bg-pink-500 w-1/2 flex items-center justify-center text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  ></input>
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
};

export default Register;
