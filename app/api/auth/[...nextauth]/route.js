// import NextAuth from 'next-auth'
// // import AppleProvider from 'next-auth/providers/apple'
// // import FacebookProvider from 'next-auth/providers/facebook'
// // import GoogleProvider from 'next-auth/providers/google'
// // import EmailProvider from 'next-auth/providers/email'
// import GitHubProvider from 'next-auth/providers/github'
// import mongoose from 'mongoose'
// import User from '@/app/models/User'
// import Payment from '@/app/models/Payment'

// export const authoptions =  NextAuth({

//     providers: [
//         GitHubProvider({
//             clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
//             clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
//           }),
//       // OAuth authentication providers...
//     //   AppleProvider({
//     //     clientId: process.env.APPLE_ID,
//     //     clientSecret: process.env.APPLE_SECRET
//     //   }),
//     //   FacebookProvider({
//     //     clientId: process.env.FACEBOOK_ID,
//     //     clientSecret: process.env.FACEBOOK_SECRET
//     //   }),
//     //   GoogleProvider({
//     //     clientId: process.env.GOOGLE_ID,
//     //     clientSecret: process.env.GOOGLE_SECRET
//     //   }),
//     //   // Passwordless / email sign in
//     //   EmailProvider({
//     //     server: process.env.MAIL_SERVER,
//     //     from: 'NextAuth.js <no-reply@example.com>'
//     //   }),
//     ],
//     callbacks: {
//         try{
//         async signIn({ user, account, profile, email, credentials }) {
//           const isAllowedToSignIn = true
//           if(account.provider == "github"){
//             //connect to the database
//             const client = await mongoose.connect("mongodb://localhost:27017/cheat")
//             // const client = await mongoose.connect("mongodb://localhost:27017/chai/")
//             //check if user already exists in the database
//             const currentUser = await User.findOne({email:email})
//             {console.log(currentUser)}
//             if(!currentUser){
//               //create new user
//               const newUser = new User({
//                 email:email,
//                 username:email.split("@")[0],
//               })
//               await newUser.save()
//               user.name = newUser.username
//             }
//             else{

//               user.name = currentUser.username
//             }

//             return true;
//           }
//         }
//             }catch(error){
//               console.log("the error is "+e);
//             }
//   }

//   })

//   export {authoptions as GET,authoptions as POST}

import NextAuth from "next-auth";
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
      scope: "read:user user:email",
    }),
    // OAuth authentication providers...
    //   AppleProvider({
    //     clientId: process.env.APPLE_ID,
    //     clientSecret: process.env.APPLE_SECRET
    //   }),
    //   FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    //   }),
    //   GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET
    //   }),
    //   // Passwordless / email sign in
    //   EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    //   }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     try {
  //       const isAllowedToSignIn = true;
  
  //       if (account.provider == "github") {
  //         // Connect to the database
  //         const client = await mongoose.connect("mongodb://localhost:27017/cheat");
  
  //         // Check if user already exists in the database
  //         const currentUser = await User.findOne({ email: email });
  //         console.log(currentUser);
  
  //         if (!currentUser) {
  //           // Create new user
  //           const newUser = new User({
  //             email: email,
  //             username: email.split("@")[0],
  //           });
  //           await newUser.save();
  //           user.name = newUser.username;
  //         } else {
  //           user.name = currentUser.username;
  //         }
  
  //         return true;
  //       }
  //     } catch (error) {
  //       console.log("Error in signIn callback:", error);
  //       return false; // Or return true based on your needs
  //     }
  //   },
  // }
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.log("Account provider:", account.provider);
  
        if (account.provider == "github") {
          // Connect to the database
          // const client = await mongoose.connect("mongodb://localhost:27017/cheat");
          await connectDB();
         

  
          // Check if user already exists in the database
          const currentUser = await User.findOne({ email: user.email });
          console.log("Current User:", currentUser);
  
          if (!currentUser) {
            console.log("coming to first block")
            // Create new user
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
            });
            await newUser.save();
            user.name = newUser.username;
            console.log("New user created:", newUser);
          }
           else {
            console.log("coming to second block")
            user.name = currentUser.username
            console.log("Existing user:", currentUser.username);
          }
  
          return true; // Allow sign-in
        }
  
        return false; // Default deny if conditions aren't met
      } catch (error) {
        console.log("Error in signIn callback:");
        return false; // Deny access on error
      }
    },
    async session({session,user,token}){
      const dbUser = await User.findOne({email:session.user.email})
      console.log(dbUser);
      
      session.user.name = dbUser.username;
      return session;
    },
  }
  
  
});

export { authoptions as GET, authoptions as POST };
