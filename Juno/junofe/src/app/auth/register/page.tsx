import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
    title: "Register - Juno",
    description: "Register here to start using Juno!"
}

export default function page() {
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
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Mario"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Gonzalez"
                                    required
                                />
                            </div>
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
                                <Label htmlFor="email">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    type="number"
                                    placeholder="888888888"
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
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 cursor-pointer">
                        Register
                    </Button>
                    {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button> */}
                    <Link className="underline" href={'/auth/login'}>Already have an account? log In here!</Link>
                </CardFooter>
            </Card>
        </div>)
}