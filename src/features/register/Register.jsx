import React from "react";
import { useForm } from "react-hook-form";

const PersonalInfo = [
  {
    name: "नाम",
    type: "text",
    placeholder: "अपना नाम दर्ज करें",
    label: "नाम",
  },
  {
    name: "पिता श्री",
    type: "text",
    placeholder: "अपने पिता का नाम दर्ज करें",
    label: "पिता श्री",
  },
  {
    name: "दादा श्री",
    type: "text",
    placeholder: "अपने दादा का नाम दर्ज करें",
    label: "दादा श्री",
  },
  {
    name: "जाति",
    type: "text",
    placeholder: "अपनी जाति दर्ज करें",
    label: "जाति",
  },
  {
    name: "व्यवसाय",
    type: "text",
    placeholder: "अपना पेशा दर्ज करें",
    label: "व्यवसाय",
  },
  {
    name: "ग्राम",
    type: "text",
    placeholder: "अपना गाँव दर्ज करें",
    label: "ग्राम",
  },
  {
    name: "पन्यायत",
    type: "text",
    placeholder: "अपनी पंचायत दर्ज करें",
    label: "पन्यायत",
  },
  {
    name: "पोस्ट",
    type: "text",
    placeholder: "अपनी पोस्ट दर्ज करें",
    label: "पोस्ट",
  },
  {
    name: "थाना",
    type: "text",
    placeholder: "अपना पुलिस स्टेशन दर्ज करें",
    label: "थाना",
  },
  {
    name: "तहसील",
    type: "text",
    placeholder: "अपनी तहसील दर्ज करें",
    label: "तहसील",
  },
  {
    name: "टप्पा",
    type: "text",
    placeholder: "अपना टप्पा दर्ज करें",
    label: "टप्पा",
  },
  {
    name: "जिला",
    type: "text",
    placeholder: "अपना जिला दर्ज करें",
    label: "जिला",
  },
  {
    name: "संभाग",
    type: "text",
    placeholder: "अपना विभाग दर्ज करें",
    label: "संभाग",
  },
];
const ContactInfo = [
  {
    name: "पारिवारिक सदस्य का नाम",
    type: "text",
    placeholder: "अपना विभाग दर्ज करें",
    label: "पारिवारिक सदस्य का नाम",
  },
  {
    name: "मो",
    type: "number",
    placeholder: "अपना विभाग दर्ज करें",
    label: "मो",
  },
  {
    name: "आधार नंबर",
    type: "number",
    placeholder: "अपना आधार नंबर दर्ज करें",
    label: "आधार नंबर",
  },
  {
    name: "प.ह. संख्या",
    type: "number",
    placeholder: "अपना पी.एच. नंबर दर्ज करें",
    label: "प.ह. संख्या",
  },
  {
    name: "वार्ड क्रमांक",
    type: "number",
    placeholder: "अपना वार्ड नंबर दर्ज करें",
    label: "वार्ड क्रमांक",
  },
  {
    name: "मतदान परिचयापत",
    type: "text",
    placeholder: "अपना वोटर आईडी दर्ज करें",
    label: "मतदान परिचय पत्र",
  },
  {
    name: "परिवार ईद",
    type: "text",
    placeholder: "अपनी पारिवारिक आईडी दर्ज करें",
    label: "परिवार ईद",
  },
  {
    name: "परिवहन लाइसेंस",
    type: "text",
    placeholder: "अपना ड्राइविंग लाइसेंस दर्ज करें",
    label: "परिवहन लाइसेंस",
  },
  {
    name: "जन्म दिन",
    type: "date",
    placeholder: "अपनी जन्म तिथि दर्ज करें",
    label: "जन्म दिन",
  },
  {
    name: "नियुक्ति तिथि",
    type: "date",
    placeholder: "अपनी नियुक्ति तिथि दर्ज करें",
    label: "नियुक्ति तिथि",
  },
  {
    name: "नियुक्ति पटेल",
    type: "text",
    placeholder: "अपना नियुक्त पटेल दर्ज करें",
    label: "नियुक्ति पटेल",
  },
  {
    name: "पुत्र",
    type: "text",
    placeholder: "अपने बेटे का नाम दर्ज करें",
    label: "पुत्र",
  },
  {
    name: "पौत्र",
    type: "text",
    placeholder: "अपने पोते का नाम दर्ज करें",
    label: "पौत्र",
  },
  {
    name: "पत्नी",
    type: "text",
    placeholder: "अपनी पत्नी का नाम दर्ज करें",
    label: "पत्नी",
  },
  {
    name: "भाई",
    type: "text",
    placeholder: "अपने भाई का नाम दर्ज करें",
    label: "भाई",
  },
  {
    name: "पुत्री",
    type: "text",
    placeholder: "अपनी बेटी का नाम दर्ज करें",
    label: "पुत्री",
  },
  {
    name: "परिवारिक सदस्य",
    type: "text",
    placeholder: "अपने परिवार के सदस्य का नाम दर्ज करें",
    label: "परिवारिक सदस्य",
  },
  {
    name: "अन्य",
    type: "text",
    placeholder: "अन्य विवरण दर्ज करें",
    label: "अन्य",
  },
];

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset()

  };

  console.log(watch("example"));

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
              >
                Back
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap">
                <div
                  class="flex items-center justify-center w-full"
                  style={{ margin: "1rem" }}
                >
                  <label
                    className=" uppercase text-blueGray-600 text-xs font-bold mb-2 flex justify-center items-center w-1/2"
                    htmlFor="grid-password"
                  >
                    फ़ोटो
                  </label>
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                  </label>
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
                      {...register(item.name, { required: true })}
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
                {ContactInfo?.map((item) => (
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
                      {...register(item.name, { required: true })}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {errors[item.name] && <p>This field is required</p>}
                  </div>
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
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300 " />

              <div className="flex items-center justify-center p-10 mt-10">
                <input
                  type="submit"
                  className="bg-pink-500 w-1/2 flex items-center justify-center text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                </input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
