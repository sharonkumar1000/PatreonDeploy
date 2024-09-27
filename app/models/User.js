import mongoose from "mongoose";
const {Schema,model} = mongoose;
const UserSchema = new Schema({
    email:{type:String,required:true},
    name:{type:String},
    username:{type:String,required:true},
    profilepic:{type:String},
    coverpic:{type:String},
    createdAt:{type:Date,default:Date.now},
    razorpayId:{type:String},
    razorpaySecret:{type:String},
    updatedAt:{type:Date,default:Date.now},
})

export default mongoose.models.User || model("User",UserSchema);

// import mongoose from "mongoose";
// const { Schema, model, models } = mongoose;

// const UserSchema = new Schema({
//   email: { type: String, required: true },
//   name: { type: String },
//   username: { type: String, required: true },
//   profilepic: { type: String },
//   coverpic: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// // Check if the model already exists to avoid re-compiling
// const User = models.User || model("User", UserSchema);

// export default User;
