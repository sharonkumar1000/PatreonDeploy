"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchuser,fetchpayments,initiate } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";


const PaymentPage = ({ username }) => {
    // const {data:session} = useSession()
  const [paymentform, setPaymentform] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(()=>{
    const getData = async ()=>{
      let u = await fetchuser(username)
      setCurrentUser(u)
      let dbpayments = await fetchpayments(username)
      setPayments(dbpayments)
  }
    getData()
  },[username])

 

  useEffect(() => {
    if(searchParams.get("payment") == "true"){
      toast('🦄 payment has been made!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      }
      router.push(`/${username}`)
  }, [searchParams, router, username])
  

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };
 
  const pay = async (amount) => {

    //get the order id
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayId, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };



  return (
    <>
          <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full bg-red-50 relative">
        <Image
          className="object-cover w-full h-48 md:h-[350] "
          src={currentUser.coverpic} 
          width={500} height={200}
          alt="no image"
        />
        <div className="overflow-hidden object-cover absolute -bottom-20 right-[38%] md:right-[45%] border-white border-2 rounded-full size-36">
          <Image
            className="rounded-full size-36"
            width={128}
            height={128}
            src={currentUser.profilepic}
            alt="cat profile"
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400 ">Lets help a {username} to get a chai</div>
        <div className="text-slate-400 ">
          {payments.length} payments. {currentUser.name} has raised ₹{payments.reduce((a,b)=>a+b.amount,0)}
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-500 rounded-lg text-white p-10">
            {/* showing the list of all supporters */}
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-5">
              {payments.length == 0 && <li>No payments yet</li>}
              {payments.map((p,i)=>{
                return( 
              <li key = {i} className="my-4 flex gap-2 items-center">
                <Image width={80} height={80} src="profile.svg" alt="" />
                <span>
                  {p.name} donated <span className="font-bold"> ₹{p.amount}</span> with a
                  message &quot;{p.message}&quot;
                </span>
              </li>
              )})}
             
            </ul>


          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-500 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a payment</h2>
            <div className="flex gap-2 flex-col">
              <input
              name = "name"
                onChange={handleChange}
                value={paymentform.name}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="enter name"
              />
              <input
              name = "message"
                onChange={handleChange}
                value={paymentform.message}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="enter message"
              />
              <input
              name = "amount"
                onChange={handleChange}
                value={paymentform.amount}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="enter amount"
              />

              <button
                type="button" onClick={()=>pay(Number.parseInt(paymentform.amount)*100)}
                className="  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-900" disabled={paymentform.name?.length <3 || paymentform.message?.length<4 || paymentform.amount?.length<1}
              >
                Pay
              </button>
            </div>
            {/* or choose from these amounts */}
            <div className="flex gap-2 mt-5 flex-col md:flex-row">
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(1000)}
              >
                pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(2000)}
              >
                pay ₹20
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(3000)}
              >
                pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

// "use client"
// import React, { useState } from 'react'
// import Script from 'next/script'

// const PaymentPage = ({ username }) => {
//   const [paymentDetails, setPaymentDetails] = useState({
//     name: '',
//     message: '',
//     amount: '',
//   });

//   const handleInputChange = (e) => {
//     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayment = () => {
//     const options = {
//       key: 'YOUR_KEY_ID',
//       amount: paymentDetails.amount * 100, // amount in paise
//       currency: 'INR',
//       name: 'Acme Corp',
//       description: 'Test Transaction',
//       image: 'https://example.com/your_logo',
//       order_id: 'order_9A33XWu170gUtm',
//       callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
//       prefill: {
//         name: paymentDetails.name || 'Anonymous',
//         email: 'gaurav.kumar@example.com',
//         contact: '9000090000',
//       },
//       notes: {
//         address: 'Razorpay Corporate Office',
//       },
//       theme: {
//         color: '#3399cc',
//       },
//     };

//     const rzp1 = new Razorpay(options);
//     rzp1.open();
//   };

//   return (
//     <>
//       <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

//       <div className="cover w-full bg-red-50 relative">
//         <img
//           className="object-cover w-full h-[350] "
//           src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/16.gif?token-time=1728000000&token-hash=2JDsRiQIRhUgJxbomN3uixuEAROyoQnBZ4OFG6CQJEY%3D"
//           alt=""
//         />
//         <div className="absolute -bottom-20 right-[44%] border-white border-2 rounded-full">
//           <img
//             className="rounded-full"
//             width={150}
//             height={150}
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSx5doFquZeBY9LchaJj1aFLGueiUnW4szIg&s"
//             alt="cat profile"
//           />
//         </div>
//       </div>

//       <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
//         <div className="font-bold text-lg">@{username}</div>
//         <div className="text-slate-400 ">creating animated art for vit</div>
//         <div className="text-slate-400 ">9,120 members post post $15,450/release</div>

//         <div className="payment flex gap-3 w-[80%] mt-11">
//           <div className="supporters w-1/2 bg-slate-500 rounded-lg text-white p-10">
//             <h2 className="text-2xl font-bold my-5">Supporters</h2>
//             {/* Static supporters list */}
//             <ul className="mx-5">
//               <li className="my-4 flex gap-2 items-center">
//                 <img src="profile.svg" alt="" />
//                 <span>
//                   Shubam donated <span className="font-bold"> $30</span> with a
//                   message "i support you bro lots of Love"
//                 </span>
//               </li>
//               {/* Repeat other supporter entries as needed */}
//             </ul>
//           </div>

//           <div className="makePayment w-1/2 bg-slate-500 rounded-lg text-white p-10">
//             <h2 className="text-2xl font-bold my-5">Make a payment</h2>
//             <div className="flex gap-2 flex-col">
//               <input
//                 type="text"
//                 name="name"
//                 className="w-full p-3 rounded-lg bg-slate-800"
//                 placeholder="Enter name"
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="message"
//                 className="w-full p-3 rounded-lg bg-slate-800"
//                 placeholder="Enter message"
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="number"
//                 name="amount"
//                 className="w-full p-3 rounded-lg bg-slate-800"
//                 placeholder="Enter amount"
//                 onChange={handleInputChange}
//               />

//               <button
//                 type="button"
//                 onClick={handlePayment}
//                 className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
//               >
//                 Pay
//               </button>
//             </div>

//             {/* Suggested payment amounts */}
//             <div className="flex gap-2 mt-5">
//               <button className="bg-slate-800 p-3 rounded-lg" onClick={() => setPaymentDetails({...paymentDetails, amount: 1000})}>Pay ₹10</button>
//               <button className="bg-slate-800 p-3 rounded-lg" onClick={() => setPaymentDetails({...paymentDetails, amount: 2000})}>Pay ₹20</button>
//               <button className="bg-slate-800 p-3 rounded-lg" onClick={() => setPaymentDetails({...paymentDetails, amount: 3000})}>Pay ₹30</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentPage;
