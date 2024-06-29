import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchUserProfileAsync, selectUser } from './profileSlice';
import { fetchContactEntriesAsync, fetchEntriesAsync, selectContactInfo, selectPersonalInfo } from '../register/registerSlice';
import { ReactToPrint } from 'react-to-print';


function Profile() {
  const id = useParams().id;
  const dispatch = useDispatch();
  var data = useSelector(selectUser)
  const componentRef = useRef(null);
  const ContactInfo = useSelector(selectContactInfo)
  const PersonalInfo = useSelector(selectPersonalInfo)
  const navigate = useNavigate()
  const newData = {}
  useEffect(() => {
    dispatch(fetchUserProfileAsync(id))
    dispatch(fetchContactEntriesAsync())
    dispatch(fetchEntriesAsync())
  }, [dispatch , id])

  data = data?.user
  if(data){
    newData["नियुक्ति तिथि"] = data["नियुक्ति तिथि"]?.split('-').reverse().join('') || 'N/A';
    newData["जन्म दिन"] = data["जन्म दिन"]?.split('-').reverse().join('') || 'N/A';
  }
  console.log(newData)
  const handlePrint = () => {
    if (componentRef.current) {
      // Accessing the DOM element for printing
      console.log(componentRef.current);
    }
  };

  console.log(data);

  if(data && ContactInfo && PersonalInfo){
    return (
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-11/12 px-4 mx-auto mt-6 " ref={componentRef} >
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0" >
            <div className="rounded-t bg-white mb-0 px-6 py-6" >
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  {data.नाम} Profile
                </h6>
                <ReactToPrint
  trigger={() => (
    <button
      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase lg:text-sm text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      onClick={handlePrint}
    >
      Print
    </button>
  )}
  content={() => componentRef.current} // Use componentRef.current to access the DOM element
  documentTitle={data.नाम}
  pageStyle={`
    @page {
      size: 1440px 1299px;
      margin: 0;
    }
    @media print {
                      body {
                        -webkit-print-color-adjust: exact;
                      }
                      .no-print {
                        display: none;
                      }
                      .print-only {
                        display: block;
                      }
                      .container {
                        width: 100%;
                        height: 100%;
                      }
                      .flex {
                        display: flex;
                      }
                      .flex-col {
                        flex-direction: column;
                      }
                      .flex-row {
                        flex-direction: row;
                      }
                      .flex-wrap {
                        flex-wrap: wrap;
                      }
                      .items-center {
                        align-items: center;
                      }
                      .justify-center {
                        justify-content: center;
                      }
                      .lg\\:w-11\\/12 {
                        width: 91.666667%;
                      }
                      .lg\\:w-1\\/5 {
                        width: 20%;
                      }
                      .lg\\:w-2\\/5 {
                        width: 40%;
                      }
                      .lg\\:w-4\\/12 {
                        width: 33.333333%;
                      }
                      .lg\\:w-1\\/2 {
                        width: 50%;
                      }
                      .lg\\:text-sm {
                        font-size: 0.875rem;
                      }
                      .text-xs {
                        font-size: 0.75rem;
                      }
                      .uppercase {
                        text-transform: uppercase;
                      }
                      .bg-blueGray-50 {
                        background-color: #F8FAFC;
                      }
                      .bg-blueGray-100 {
                        background-color: #F1F5F9;
                      }
                      .bg-white {
                        background-color: #FFFFFF;
                      }
                      .border {
                        border-width: 1px;
                      }
                      .rounded-lg {
                        border-radius: 0.5rem;
                      }
                      .shadow-lg {
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                      }
                    }
                  `}
                />
                <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase lg:text-sm text-xs  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  Edit
                </button>


                <Link to="/search"
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase lg:text-sm text-xs  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Back
                </Link>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form noValidate>
                <div className="flex flex-wrap">
                  <div
                    class="flex sm:flex items-center justify-center w-full p-4  flex-col md:flex-row lg:flex-row sm:flex-row  "
                    style={{ margin: "1rem" }}
                  >
                    <label
                      className=" uppercase  lg:text-sm text-xs  font-bold mb-2 flex justify-center items-center "
                      htmlFor="grid-password"
                    >
                    </label>
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center lg:w-1/4 w-full md:w-1/4 h-64 lg:h-48   border-gray-300 cursor-pointer "
                    >
                      <div class="flex flex-col   items-center justify-center pt-5 pb-6">

                       <img src={data.imageURL || "https://via.placeholder.com/150"} alt='profileURL' className='rounded-xl lg:h-48 ' />

                        </div>
                    </label>
                  </div>
                  {PersonalInfo?.map((item) => (
                   <div
                   className={`flex ${item.name === "पारिवारिक सदस्य का नाम" ? "lg:w-2/5 md:w-2/5  sm:w-2/5" : "lg:w-1/5 md:w-1/5 sm:2/3"}  gap-2 w-full mb-3 px-2`}
                   key={item.name}
                 >
                      <label
                        className={`uppercase  lg:text-sm text-xs  font-bold items-center justify-center flex ${item.name === "पारिवारिक सदस्य का नाम" ? "lg:w-3/5 md:w-3/5 sm:1/5" : "lg:w-1/3 md:w-1/3 sm:1/5"} `}
                        htmlFor="grid-password"
                      >
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        value={data[item.name] || 'N/A'}
                        placeholder={item.placeholder}

                        className=" pointer-events-none border-0 px-3 py-3 lg:w-full md:w-full  placeholder-blueGray-300  bg-white rounded lg:text-sm text-xs  shadow focus:outline-none focus:ring  ease-linear transition-all duration-150"
                      />
                    </div>
                  ))}
                   {ContactInfo?.slice(0, 7).map((item) => (
                      <div
                        className={`flex md:w-auto lg:w-auto mt-4 gap-2 w-full mb-3`}
                        key={item.name}
                      >
                        <label
                          className={`uppercase  lg:md:text-xs text-xs  font-bold items-center justify-center flex lg:w-1/2 md:w-1/2 lg:p-4 md:p-2`}
                          htmlFor="grid-password"
                        >
                          {item.label}
                        </label>
                        <div className="flex">
                          {data[item.name].split('').map((value, index) => (
                            <div
                              // type="text"
                              // maxLength="1"
                              className="border bg-white border-black text-center pointer-events-none lg:p-4 md:p-3"
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
                </div>
                <div className="flex lg:flex-wrap lg:flex-row md:flex-row flex-col flex-shrink-0 lg:mt-4 items-center lg:mb-4 lg:gap-16">
                      {ContactInfo?.slice(7,9).map((item) => (
                        <div
                        className={`flex lg:w-auto md:w-auto mt-4 gap-2 mb-3`}
                        key={item.name}
                      >
                        <label
                          className={`uppercase  lg:text-sm text-sm  font-bold items-center justify-center flex md:p-4 lg:w-1/2 md:w-1/2`}
                          htmlFor="grid-password"
                        >
                          {item.label}
                        </label>
                        <div className="flex">
                        {newData[item.name].split('').map((value, index) => (
                            <div
                              // type="text"
                              // maxLength="1"
                              className="border bg-white border-black text-center pointer-events-none lg:p-4 md:p-3 "
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
                    </div>
                    <div className="flex flex-wrap mt-8 items-center mb-4 lg:gap-16 gap-4 font-bold">
                      {ContactInfo?.slice(9).map((item) => (
                        <>
                          <label className="flex items-center w-auto" key={item.name}>
                          {item.label}
                          <input
                            type="checkbox"
                            name="status"
                            checked={data[item.name]}
                            className="ml-4 " 
                          />
                        </label>
                        </>
                      ))}
                    </div>
                      <hr className="mt-6 border-b-1 border-blueGray-300 " />
                <h6 className="text-blueGray-400 lg:text-sm text-xs  mt-3 mb-6 font-bold uppercase">
                  मो
                </h6>
                <div className="flex flex-wrap ">
                  <div className=" lg:w-4/12 md:w-1/3 ">
                    <div className=" gap-4 w-full mb-3 flex">
                      <label
                        className="flex justify-center items-center uppercase  lg:text-sm text-sm  font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <div className="flex">
                      {data?.phone1?.split('').map((value, index) => (
                          <div
                            type="text"
                            maxLength="1"
                            className="border text-center  pointer-events-none lg:p-4 md:p-2 "
                            value={value}
                            readOnly
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className=" lg:w-4/12 md:w-1/3 px-4">
                    <div className=" gap-4 w-full mb-3 flex">
                      <label
                        className="flex justify-center items-center uppercase  lg:text-sm text-sm  font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <div className="flex">
                      {data?.phone2?.split('').map((value, index) => (
                          <div
                          type="text"
                          maxLength="1"
                          className="border text-center p-1.5  pointer-events-none lg:w-9 lg:p-4 md:p-2 "
                          value={value}
                          readOnly
                        >
                          {value}
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-4/12 md:w-1/3 px-4">
                    <div className=" gap-4 w-full mb-3 flex">
                      <label
                        className="flex justify-center items-center uppercase  lg:text-sm textsm  font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        मो
                      </label>
                      <div className="flex">
                      {data?.phone3?.split('').map((value, index) => (
                          <div
                          type="text"
                          maxLength="1"
                          className="border text-center p-1.5  pointer-events-none lg:w-9 lg:p-4 md:p-2 "
                          value={value}
                          readOnly
                        >
                          {value}
                        </div>
                        ))}
                      </div>
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