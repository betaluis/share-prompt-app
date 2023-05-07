import { connectToDatabase } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
})

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    async session({ session }) {
},
    async signIn({ profile }) {
        try {
            connectToDatabasea();
            // Check if user exists in database
            
            // If user does not exist, create user

            // If user exists, return true to sign in
        } catch (error) {
            console.log(error);
            return false;
        }
    }
});

export { handler as GET, handler as POST };
