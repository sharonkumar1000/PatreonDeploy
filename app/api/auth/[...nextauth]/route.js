

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
       
  
        if (account.provider == "github") {
          // Connect to the database
          // const client = await mongoose.connect("mongodb://localhost:27017/cheat");
          await connectDB();
         

  
          // Check if user already exists in the database
          const currentUser = await User.findOne({ email: user.email });
          
  
          if (!currentUser) {
            
            // Create new user
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
            });
            await newUser.save();
            user.name = newUser.username;
           
          }
           else {
           
            user.name = currentUser.username
          
          }
  
          return true; // Allow sign-in
        }
  
        return false; // Default deny if conditions aren't met
      } catch (error) {
       
        return false; // Deny access on error
      }
    },
    async session({session,user,token}){
      const dbUser = await User.findOne({email:session.user.email})
     
      
      session.user.name = dbUser.username;
      return session;
    },
  }
  
  
});

export { authoptions as GET, authoptions as POST };
