import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        await connectDB()

        let body: LoginBody = await req.json()

        let { email, password } = body;

        if (!email || !password) {
            return NextResponse.json<ApiResponse>({
                success: false, message: "All fields are required",
            }, {
                status: 400
            })
        };

        let isExisted = await UserModel.findOne({ email })

        if (!isExisted) return NextResponse.json<ApiResponse>({
            success: false, message: "User not found",
        }, {
            status: 404
        })

        let matchPass = isExisted.comparePass(password)

        if (!matchPass) return NextResponse.json<ApiResponse>({
            success: false, message: "Invalid credentials",
        }, {
            status: 401
        })


        let token = generateToken({ userId: isExisted._id.toString() })

        let response = NextResponse.json<ApiResponse>({
            success: true, message: "User registered successfully", data: {
                user: {
                    _id: isExisted._id,
                    name: isExisted.name,
                    email: isExisted.email
                }
            }
        }, { status: 201 })

        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })

        return response

    } catch (error) {
        console.log("error in register api", error)
        return NextResponse.json<ApiResponse>({
            success: false, message: "Something went wrong", error: {
                error
            }
        }, { status: 500 })
    }
}