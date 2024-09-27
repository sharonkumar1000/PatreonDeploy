import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";

export const POST = async(req) =>{
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)
    //check if razor pay order id is present on the server
    let p = await Payment.findOne({oid:body.razorpay_order_id})
    if(!p){
        // return NextResponse.error("order id not found") 
        return NextResponse.json({success:false,message:"order id not found"})
    }


    //get the payment of the user who is getting the payment
    let user = await User.findOne({username:p.to_user})
    const secret = user.razorpaySecret

    //verify the payment
    let xx = validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},
       body.razorpay_signature,secret)
    if(xx){
        const updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:"true"},{new:true})

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?payment=true`)
    }
    else{
        return NextResponse.error("Payment verification Failed")
    }

}




// import { NextResponse } from "next/server";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Razorpay from "razorpay";
// import Payment from "@/app/models/Payment";
// import connectDB from "@/db/connectDb";
// import User from "@/app/models/User";

// export const POST = async (req) => {
//     await connectDB();
//     let body = await req.formData();
//     body = Object.fromEntries(body);

//     // Check if Razorpay order id is present on the server
//     let p = await Payment.findOne({ oid: body.razorpay_order_id });
//     if (!p) {
//         return NextResponse.json({ success: false, message: "order id not found" });
//     }

//     // Get the payment details of the user who is receiving the payment
//     let user = await User.findOne({ username: p.to_username });
//     const secret = user.razorpaySecret;

//     // Verify the payment
//     let isValid = validatePaymentVerification(
//         { "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id },
//         body.razorpay_signature,
//         secret
//     );

//     if (isValid) {
//         // Update the payment as done
//         const updatedPayment = await Payment.findOneAndUpdate(
//             { oid: body.razorpay_order_id },
//             { done: "true" },
//             { new: true }
//         );

//         // Convert updatedPayment to a plain object before redirect
//         const updatedPaymentPlain = {
//             ...updatedPayment._doc, // Spread the original document into a plain object
//             _id: updatedPayment._id.toString(), // Convert ObjectId to string
//             created_at: updatedPayment.created_at.toISOString(), // Convert Date to ISO string
//             updated_at: updatedPayment.updated_at.toISOString(), // Convert Date to ISO string
//         };

//         return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPaymentPlain.to_user}?payment=true`);
//     } else {
//         return NextResponse.error("Payment verification failed");
//     }
// };
