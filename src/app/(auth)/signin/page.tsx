'use client'
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/hooks/use-toast";
import { signinSchema } from "@/schema/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
export default function Signin() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    });
    const { toast } = useToast();
    const onSubmit = async (data: z.infer<typeof signinSchema>) => {
        setIsSubmitting(true);
        try {
            const result = await signIn('credentials', {
                identifier: data.identifier,
                password: data.password,
                redirect: false
            })
            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    toast({
                        title: "Login Failed",
                        description: "Incorrect username or password",
                        variant: "destructive"
                    })
                } else {
                    toast({
                        title: "Error",
                        description: result.error,
                        variant: "destructive"
                    })
                }
            }
            if (result?.url) {
                router.replace('/dashboard')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to signin",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome to True Feedback
                    </h1>
                    <p className="mb-4">Sign in to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email/Username</FormLabel>
                                    <Input {...field} name="email" />
                                    <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...field} name="password" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        New to True Feedback?{' '}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}