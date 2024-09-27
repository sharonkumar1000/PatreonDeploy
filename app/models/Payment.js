import mongoose from "mongoose";
const {Schema,model} = mongoose
const PaymentSchema = new Schema({
    name:{type:String,required:true},
    to_user:{type:String,required:true},
    oid:{type:String,required:true},
    message:{type:String},
    amount:{type:Number,required:true},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now},
    done:{type:Boolean,default:false},
})

export default mongoose.models.Payment ||  model("Payment",PaymentSchema);

// import mongoose from "mongoose";
// const { Schema, model, models } = mongoose;

// const PaymentSchema = new Schema({
//     name: { type: String, required: true },
//     to_user: { type: String, required: true },
//     oid: { type: String, required: true },
//     message: { type: String },
//     amount: { type: Number, required: true },
//     created_at: { type: Date, default: Date.now },
//     updated_at: { type: Date, default: Date.now },
//     done: { type: Boolean, default: false },
// });

// // Check if the model already exists to avoid re-compiling
// const Payment = models.Payment || model("Payment", PaymentSchema);

// export default Payment;
