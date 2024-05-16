"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
   
} from "@/components/ui/form"
import { signIn, signUp } from '../lib/actions/user.action'
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


const AuthForm = ({ type }: AuthFormProps) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const authFormSchema = (type: string) => z.object({
        //sign up
        firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        address: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        state: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        city: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        dob: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
        // both
        email: z.string().email(),
        password: z.string(),
    })

    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            postalCode: "",
            dob: "",
            ssn: "",
            city: ""

        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            // Login with appwrite & create a plaid link token
            if (type == 'sign-up') {
                const newUser = await signUp(data)
            }
            if (type == 'sign-in') { 
                const response = await signIn({
                    email : data.email,
                    password : data.password
                })
                if(response) router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className="flex  cursor-pointer items-center gap-1">
                    <Image
                        src={"/icons/logo.svg"}
                        height={34}
                        width={34}
                        alt="Horizon"
                    />
                    <h1 className='text-36 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {
                            user ? 'Link Account'
                                : type === 'sign-in'
                                    ? 'Sign in' : 'Sign up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ?
                                'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* Plaid Link */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex gap-2">
                                        <CustomInput
                                            name='firstName'
                                            label='First Name'
                                            placeholder='enter your first name'
                                            type={'text'}
                                            form={form}
                                        />
                                        <CustomInput
                                            name='lastName'
                                            label='Last Name'
                                            placeholder='enter your last name'
                                            type={'text'}
                                            form={form}
                                        />
                                    </div>
                                    <CustomInput
                                        name='address'
                                        label='Adress'
                                        placeholder='enter your address'
                                        type={'text'}
                                        form={form}
                                    />
                                    <div className="flex justify-between">

                                        <CustomInput
                                            name='state'
                                            label='State'
                                            placeholder='ex: France'
                                            type={'text'}
                                            form={form}
                                        />
                                        <CustomInput
                                            name='city'
                                            label='City'
                                            placeholder='ex: Paris'
                                            type={'text'}
                                            form={form}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <CustomInput
                                            name='postalCode'
                                            label='Postal code'
                                            placeholder='ex: 75015'
                                            type={'text'}
                                            form={form}
                                        />
                                        <CustomInput
                                            name='dob'
                                            label='Date of birth'
                                            placeholder='yyy-mm-dd'
                                            type={'date'}
                                            form={form}
                                        />
                                    </div>
                                    <CustomInput
                                        name='ssn'
                                        label='SSN'
                                        placeholder='ex: 1234'
                                        type={'text'}
                                        form={form}
                                    />
                                </>
                            )}
                            <CustomInput
                                name='email'
                                label='Email'
                                placeholder='enter your email'
                                type={'email'}
                                form={form}
                            />
                            <CustomInput
                                name='password'
                                label='Password'
                                placeholder='enter your passsword'
                                type={'password'}
                                form={form}
                            />
                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='form-btn' disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...

                                        </>
                                    ) : type === 'sign-in' ?
                                        'Sign in' : 'Sign up'
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {
                                type == 'sign-in' ?
                                    "Don't have an account ?" :
                                    "Already have an account ?"
                            }
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                            {type === 'sign-in' ? 'Sign up' : 'Sign In'}
                        </Link>

                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm