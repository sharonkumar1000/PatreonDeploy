// "use client"
// import { useRouter } from 'next/navigation'
// import { useSession,signIn,signOut } from 'next-auth/react'
// import { useEffect, useState } from 'react'
// import React from 'react'
// import {fetchuser,updateProfile} from '@/actions/useractions'

// const Dashboard = () => {
//   const router = useRouter();
//     const {data:session,update} = useSession()
//     const [form,setform] = useState({})

//     useEffect(() => {
//       getData()
//       if (!session) {
//         router.push('/login');
//       }
//     }, [session, router]);
//     const getData = async()=>{
//       let u = await fetchuser(session.user.name)
//       setform(u)
//     }


//     const handleSubmit = async(e)=>{
//       let a = await updateProfile(e,session.user.name)
//       alert("profile updated")
//     }

//   return (
//     <div>Dashboard
//       <form action="" action={handleSubmit}>
//         <div className="my-2 flex justify-center items-center flex-col">
//           <label htmlFor="razorpayId">Name</label>
//           <input id = "razorpayId" type="text" />
//         </div>
//         <div className="my-2 flex justify-center items-center flex-col">
//           <label htmlFor="razorpayId">Email</label>
//           <input id = "razorpayId" type="text" />
//         </div>
//         <div className="my-2 flex justify-center items-center flex-col">
//           <label htmlFor="razorpayId">UserName</label>
//           <input id = "razorpayId" type="text" />
//         </div>
//         <div className="my-2 flex justify-center items-center flex-col">
//           <label htmlFor="razorpayId">profile Picture</label>
//           <input id = "razorpayId" type="text" />
//         </div>
//         <div className="my-2 flex justify-center items-center flex-col">
//           <label htmlFor="razorpayId">cover picture</label>
//           <input id = "razorpayId" type="text" />
//         </div>
//         <div className="my-2 flex justify-center items-center flex-col">
//           <label htmlFor="razorpayId">razor pay Id</label>
//           <input id = "razorpayId" type="text" />
//         </div>
//         <div className="my-2 flex justify-center items-center flex-col">
//           <label htmlFor="razorpayId">razor pay secret</label>
//           <input id = "razorpayId" type="text" />
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Dashboard












"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import React from "react";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  useEffect(() => {
    getData();
    if (!session) {
      router.push("/login");
    }
  }, [session, router,getData]);

  // const getData = async () => {
  //   let u = await fetchuser(session.user.name);
  //   setForm(u);
  // };
  const getData = async () => {
    if (session && session.user) {
      let u = await fetchuser(session.user.name);
      setForm(u);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    await updateProfile(form, session.user.name);
    toast('🦄 profile updated!', {
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
{/* Same as */}
<ToastContainer />
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <form action={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className=" text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              className=" text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="profilepic" className="mb-1 font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              id="profilepic"
              name="profilepic"
              type="text"
              value={form.profilepic}
              onChange={handleChange}
              className="text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="coverpic" className="mb-1 font-medium text-gray-700">
              Cover Picture
            </label>
            <input
              id="coverpic"
              name="coverpic"
              type="text"
              value={form.coverpic}
              onChange={handleChange}
              className="text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="razorpayId" className="mb-1 font-medium text-gray-700">
              Razorpay ID
            </label>
            <input
              id="razorpayId"
              name="razorpayId"
              type="text"
              value={form.razorpayId}
              onChange={handleChange}
              className="text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="razorpaySecret" className="mb-1 font-medium text-gray-700">
              Razorpay Secret
            </label>
            <input
              id="razorpaySecret"
              name="razorpaySecret"
              type="text"
              value={form.razorpaySecret}
              onChange={handleChange}
              className="text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="text-black bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Dashboard;




