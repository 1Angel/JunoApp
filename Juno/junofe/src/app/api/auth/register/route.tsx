import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        // leer el JSON enviado desde el frontend
        const {first_name,last_name, phone_number, email, password} = await req.json();

        const res = await fetch(`${process.env.API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                first_name,
                last_name,
                phone_number,
                email,
                password
            })
        });

        const result = await res.json();

        if (!res.ok) {
            console.log(result.errors);
            return Response.json({errors: result.errors, message: result.message}, { status: res.status });
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