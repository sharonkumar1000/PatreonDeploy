"use server";


import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";


export const initiate = async (amount, to_user, paymentform) => {
  await connectDB();
  let user = await User.findOne({username:to_user})
    const secret = user.razorpaySecret
  var instance = new Razorpay({
    // key_id: process.env.NEXT_PUBLIC_KEY_ID,
    // key_secret: process.env.KEY_SECRET,
    key_id: user.razorpayId,
    key_secret: user.razorpaySecret,
  });

//   instance.orders.create({
//     amount: 50000,
//     currency: "INR",
//     receipt: "receipt#1",
//     notes: {
//       key1: "value3",
//       key2: "value2",
//     },
//   });
  let options  = {
    amount:Number.parseInt(amount),
    currency:"INR"
  }
  let x = await instance.orders.create(options)
//   create a payment model which shows a pending payment
   await Payment.create({oid:x.id,amount:amount/100,to_user:to_user,name:paymentform.name,message:paymentform.message})
   return x;
};

// export const fetchuser = async(username)=>{
//   await connectDB()
//   let u = await User.findOne({username:username}).lean()
//   let user = u.toObject({flattenObjectIds:true})
//   return user;
// }
export const fetchuser = async (username) => {
  await connectDB();
  let user = await User.findOne({ username: username }).lean(); // Use lean() to get a plain object
  return user; // Return the plain object
};

// export const fetchuser = async (username) => {
//   await connectDB();
//   let user = await User.findOne({ username: username }).lean();

//   if (user) {
//     user._id = user._id.toString(); // Convert ObjectId to string
//   }

//   return user;
// };





// export const fetchpayments = async (username) => {
  //   await connectDB();
  //   // Find all payments sorted by decreasing order of amount and return a plain object
  //   let payments = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean();
  //   return payments;
  // };
  
  export const fetchpayments = async(username)=>{
    await connectDB()
    //find all the payments sortted by decreasing order of amounts and flatten object ids
    let p = await Payment.find({to_user:username,done:true}).sort({amount:-1}).lean()
    return p;
  }


  // export const fetchpayments = async (username) => {
  //   await connectDB();
  
  //   let payments = await Payment.find({ to_user: username, done: true })
  //     .sort({ amount: -1 })
  //     .lean();
  
  //   // Convert _id and Date fields to strings
  //   payments = payments.map(payment => ({
  //     ...payment,
  //     _id: payment._id.toString(), // Convert ObjectId to string
  //     created_at: payment.created_at.toISOString(), // Convert Date to ISO string
  //     updated_at: payment.updated_at.toISOString(), // Convert Date to ISO string
  //   }));
  
  //   return payments;
  // };
  

// export const updateProfile= async(data,oldusername)=>{
//   await connectDB();
//   let ndata = Object.fromEntries(data)
//   //if the username is being updated ,check the username is available
//   if(oldusername !== ndata.username){
//     let u = await User.findOneAndUpdate({username:ndata.username})
//     if(u){
//       return {error:"username already exists"}
//     }
//   }
//   await User.updateOne({email:ndata.email},ndata)

// }


export const updateProfile = async (data, oldusername) => {
  await connectDB();

  // If the username is being updated, check if the new username is available
  if (oldusername !== data.username) {
    let u = await User.findOne({ username: data.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: data.email }, data);
    await Payment.updateMany({to_user:oldusername},{to_user:data.username})

  }
  else{

    
    // Update user data by email
    await User.updateOne({ email: data.email }, data);
    //now update all the username in the payments table
  }
};
