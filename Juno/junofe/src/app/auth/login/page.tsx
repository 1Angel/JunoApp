"use client"

import { LoginPayload } from "@/app/api/auth/route"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


const data: LoginPayload = {
    email: "anel@gmail.com",
    password: "!Angel0"
}

export default function page() {

    const router = useRouter();

    const [error, setError] = useState<string>('');

    async function handlerLogin() {
        const res = await fetch(`/api/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (res.ok) {
            router.push('/')
        }
        else if (!res.ok) {
            setError(result.message);
        }
    }

    return (
        <div className="flex justify-center items-center px-10 py-15">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    {/* <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>

                            {
                                error && (<div className="text-center">
                                    <span className="text-red-700">{error}</span>
                                </div>)
                            }

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handlerLogin} type="submit" className="w-full bg-red-700 hover:bg-red-800 cursor-pointer">
                        Login
                    </Button>
                    {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button> */}
                    <Link className="underline" href={'/auth/register'}>Dont have an account? Register here!</Link>
                </CardFooter>
            </Card>
        </div>
    )
}