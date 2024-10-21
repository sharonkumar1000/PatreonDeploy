import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export default function Home() {
  return (
    <>
   
    <div className="flex justify-center items-center flex-col text-white h-[44vh] px-5 text-xs md:text-base">
      <div className="font-bold text-5xl md:text-5xl">Buy Me a Chai <span><Image className="invertImg" src="" alt="" /></span></div>
      <p className="text-center md:text-left">
        A crowd funding platform for creators .Get funded by your followers and fans
      </p>
      
      <div className="font-bold">
        <Link href={"/login"}>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start here</button>
        </Link>
        <Link href={"/about"}>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </Link>
      </div>
      This is roobody
    </div>
    <div className="bg-white h-1 opacity-10">
      hii
    </div>
    <div className="text-white  container py-20">
      <h1 className="text-lg font-bold text-center mb-14">Your fans can buy you a chai</h1>
      <div className="flex gap-5 justify-around">
      <div className="item space-y-3 flex flex-col justify-center items-center ">
          <Image width = {88} height={88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="no iamge" />
          <Image width = {88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <p className="font-bold text-center">Your Fans want to help</p>
          <p className="text-center">Your fans are available to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col justify-center items-center ">
          <Image width = {88} height={88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <Image width = {88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <p className="font-bold text-center">Your Fans want to help</p>
          <p className="text-center">Your fans are available to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col justify-center items-center ">
          <Image width = {88} height={88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <Image width = {88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <p className="font-bold text-center">Your Fans want to help</p>
          <p className="text-center">Your fans are available to help you</p>
        </div>
      </div>
    </div>
    <div className="text-white  container py-15">
      <h1 className="text-lg font-bold text-center mb-14">Your fans can buy you a chai</h1>
      <div className="flex gap-5 justify-around">
      <div className="item space-y-3 flex flex-col justify-center items-center ">
          <Image width = {88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <p className="font-bold text-center">Your Fans want to help</p>
          <p className="text-center">Your fans are available to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col justify-center items-center ">
          <Image width = {88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <p className="font-bold text-center">Your Fans want to help</p>
          <p className="text-center">Your fans are available to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col justify-center items-center ">
          <Image width = {88} className="bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
          <p className="font-bold text-center">Your Fans want to help</p>
          <p className="text-center">Your fans are available to help you</p>
        </div>
      </div>
    </div>
    </>
  );
}
