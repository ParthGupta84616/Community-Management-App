import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchUserProfileAsync, selectUser } from '../profile/profileSlice';
import { fetchContactEntriesAsync, fetchEntriesAsync, selectContactInfo, selectPersonalInfo } from '../register/registerSlice';
import { useForm } from "react-hook-form";
import ImageCompressor from "image-compressor.js";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import { updateUserAsync } from '../profile/profileSlice';

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let data = useSelector(selectUser);
  const ContactInfo = useSelector(selectContactInfo);
  const PersonalInfo = useSelector(selectPersonalInfo);
  const navigate = useNavigate();
  const [url, setUrl] = useState(data?.user?.imageURL);

  const {
    register,
    handleSubmit,
    // reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchUserProfileAsync(id));
    dispatch(fetchContactEntriesAsync());
    dispatch(fetchEntriesAsync());
  }, [dispatch, id]);

  const onSubmit = (formData) => {
    const preprocessData = (data) => {
      const processedData = { ...data };
      for (const key in processedData) {
        if (typeof processedData[key] === 'string' && processedData[key].trim() === "") {
          processedData[key] = "N/A";
        }
      }
      return processedData;
    };
    const processedData = preprocessData(formData);
    if (url) {
      processedData["imageURL"] = url;
      setUrl(null);

    }
    console.log(id, processedData)
    dispatch(updateUserAsync({ data: { id: data?._id }, processedData }));
    navigate("/search" );
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
          convertSize: 50000, //
        })
        .then((compressedFile) => {
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
                setUrl(downloadURL);
              });
            }
            
          );
        })
        .catch((error) => {
          console.error("Compression error:", error);
        });
    }
  };

  data = data?.user;

  if (data && ContactInfo && PersonalInfo) {
    return (
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-11/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  {data.नाम} Profile
                </h6>

                <button
                  type="submit"
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>

                <Link to="/search"
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Back
                </Link>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap">
                  {url ? (
                    <div
                    className="flex items-center justify-center w-full p-4 flex-col lg:flex-row"
                    style={{ margin: "1rem" }}
                  >
                    <label
                      className="uppercase text-blueGray-600 text-xs font-bold mb-2 flex justify-center items-center"
                      htmlFor="grid-password"
                    >
                    </label>
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center lg:w-1/4 w-full md:w-1/2 h-64 lg:h-36 border-gray-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img src={url || "https://via.placeholder.com/150"} alt="profileURL" className="rounded-xl lg:h-36" />
                      </div>
                    </label>
                    <button
                      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setUrl(null)}
                    >
                      Remove Photo
                    </button>
                  </div>
                  ):(
                    
                    <div className="w-full m-10 flex justify-center items-center">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center lg:w-1/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 " 
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
                    </div>
                  )

                  }
                  {PersonalInfo?.map((item) => (
                    <div
                      className="relative lg:w-1/5 w-full mb-3 px-4 md:w-1/2"
                      key={item.name}
                    >
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        defaultValue={data[item.name] || 'N/A'}
                        placeholder={item.placeholder}
                        {...register(item.name)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  ))}
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                {ContactInfo?.slice(0, 9).map((item) => (
                    <div
                      className="relative lg:w-1/6 w-full mb-3 px-4 md:w-1/2"
                      key={item.name}
                    >
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        defaultValue={data[item.name] || 'N/A'}
                        placeholder={item.placeholder}
                        {...register(item.name, {
                          required: item.name === 'मो' // Conditionally apply required rule
                        })}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap mt-8 items-center mb-4 lg:gap-11 gap-4">
                  <label className="w-32 ">स्थिति पॅटर्न:</label>
                  {ContactInfo?.slice(9).map((item) => (
                    // <div className="flex justify-b">
                      <label className="flex items-center w-auto" key={item.name}>
                        {item.label}
                      <input
                        type="checkbox"
                        name="status"
                        {...register(item.name)}
                        className="ml-2"
                      />
                    </label>
                    // </div>
                  ))}
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  मो
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <input
                        type="text"
                        defaultValue={data.phone1 || 'N/A'}
                        {...register("phone1")}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <input
                        type="text"
                        defaultValue={data.phone2 || 'N/A'}
                        {...register("phone2")}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <input
                        type="text"
                        defaultValue={data.phone3 || 'N/A'}
                        {...register("phone3")}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  else{
    return (
      <div className="">
        <div role="status" className="flex items-center justify-center h-screen">
          <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
 
}

export default Profile