"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from "@/store/AuthStore"
import { IUser } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
}

const newUser: IUser = {
    email: "email@gmail.com",
    id: "1213-dafafa-fafa",
    first_name: "angelo",
    last_name: "milloneye"
}

export default function page() {

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const { LogIn } = useAuthStore();

    const { register, handleSubmit } = useForm<RegisterForm>();

    const registerUser: SubmitHandler<RegisterForm> = async (data) => {
        const res = await fetch(`/api/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (res.ok) {
            router.push(`/`);
            LogIn(newUser)
        } else if (!res.ok) {
            if (result.errors) {
                setErrors(result.errors)
            } else {
                setErrorMessage(result.message)
            }
        }
    }



    return (
        <div className="flex justify-center items-center px-10 py-10">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register to use Juno</CardTitle>
                    {/* <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(registerUser)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Mario"
                                    required
                                    {...register("first_name")}
                                />
                                {
                                    errors.first_name && (
                                        <p className="text-red-500 text-sm">{errors.first_name[0]}</p>
                                    )
                                }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Gonzalez"
                                    required
                                    {...register("last_name")}

                                />
                                {
                                    errors.last_name && (
                                        <p className="text-red-500 text-sm">{errors.last_name[0]}</p>
                                    )
                                }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email")}

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
                                <Label htmlFor="email">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    type="number"
                                    placeholder="888888888"
                                    required
                                    {...register("phone_number")}

                                />
                                {
                                    errors.phone_number && (
                                        <p className="text-red-500 text-sm">{errors.phone_number[0]}</p>
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
                                <Input id="password" type="password" required {...register("password")}
                                />
                                {
                                    errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password[0]}</p>
                                    )
                                }
                            </div>
                            <div className="mt-4 flex-col gap-2">
                                <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 cursor-pointer">
                                    Register
                                </Button>
                                {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button> */}
                                <Link className="underline" href={'/auth/login'}>Already have an account? log In here!</Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>)
}
// {/* <CardFooter className="flex-col gap-2">
//     <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 cursor-pointer">
//         Register
//     </Button>
//     {/* <Button variant="outline" className="w-full">
//                         Login with Google
//                     </Button> */}
//     <Link className="underline" href={'/auth/login'}>Already have an account? log In here!</Link>
// </CardFooter> */}