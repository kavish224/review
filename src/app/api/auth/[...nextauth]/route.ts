import NextAuth from "next-auth";
import { authOptions } from "./option";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);