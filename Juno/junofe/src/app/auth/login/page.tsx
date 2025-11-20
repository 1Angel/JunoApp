"use client"

import { LoginPayload } from "@/app/api/auth/route"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from "@/store/AuthStore"
import { IUser } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"


const data: LoginPayload = {
    email: "angel@gmail.com",
    password: "!Angel13"
}

type LoginForm = {
    email: string;
    password: string;
}

const newUser: IUser = {
    email: data.email,
    id: "1213-dafafa-fafa",
    first_name: "angelo",
    last_name: "milloneye"
}

export default function page() {

    const { LogIn } = useAuthStore();

    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { register, handleSubmit, watch } = useForm<LoginForm>();

    const loginUser: SubmitHandler<LoginForm> = async (data) => {

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
            router.push('/');
            LogIn(newUser);
        }
        else if (!res.ok) {
            if (result.errors) {
                setErrors(result.errors);
            } else {
                setErrorMessage(result.message);
            }
        }
    }

    return (
        <div className="flex justify-center items-center px-10 py-40">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    {/* <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email", { required: true })}
                                />
                                {
                                    errors.email && (
                                        <p className="text-red-500 text-sm">{errors.email[0]}</p>
                                    )
                                }
                                {
                                    errorMessage && (
                                        <p className="text-red-500 text-sm">{errorMessage}</p>
                                    )
                                }
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
                                <Input id="password" type="password" required  {...register("password", { required: true })} />
                                {
                                    errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password[0]}</p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="mt-4 flex-col gap-2">
                            <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 cursor-pointer">
                                Login
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button> */}
                            <Link className="underline" href={'/auth/register'}>Dont have an account? Register here!</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
// {/* <CardFooter className="flex-col gap-2">
//     <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 cursor-pointer">
//         Login
//     </Button>
//     {/* <Button variant="outline" className="w-full">
//         Login with Google
//     </Button> */}
// <Link className="underline" href={'/auth/register'}>Dont have an account? Register here!</Link>
// </CardFooter> */}