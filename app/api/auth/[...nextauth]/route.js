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
    callbacks: {
        async session({ session }) {
            try {
                connectToDatabase();
                const user = await User.findOne({ email: session.user.email });
                if (user) {
                    session.user.username = user.username;
                    session.user.image = user.image;
                    session.user.id = user._id.toString();
                }
                return session;
            } catch (error) {
                console.log(error);
                return session;
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDatabase();

                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
