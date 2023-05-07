import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/User";
import { connectToDatabase } from "@utils/database";

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
            const userExists = await User.findOne({ email: profile.email });
            if (!userExists) {
                const user = await User.create({
                    email: profile.email,
                    username: profile.name.replace(/\s/g, "").toLowerCase(),
                    image: profile.image,
                });

                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
});

export { handler as GET, handler as POST };
