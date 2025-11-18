import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface LoginPayload {
    email: string;
    password: string;
}

const data: LoginPayload = {
    email: "angel@gmail.com",
    password: "!Angel01"
}



export async function POST(req: Request) {

    try {
        // leer el JSON enviado desde el frontend
        const body = await req.json();

        const res = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        });

        const result = await res.json();

        if (!res.ok) {
            return Response.json(result, { status: res.status });
        }else{
            const cookies = res.headers.get('set-Cookie');

            return NextResponse.json(result, {status : res.status, headers: {
                "Content-Type": "application/json",
                ...(cookies? {"Set-Cookie": cookies}: {})
            }});
        }
    } catch (err) {
        return Response.json("error");
    }

}