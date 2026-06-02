import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;

    if (!token) throw new Error("Token not found");

    const decode = verifyToken(token);
    console.log("decode value", decode)

    if (!decode) throw new Error("unauthorize");

    return decode.userId

}