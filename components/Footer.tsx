import { logOut } from '@/lib/actions/user.action'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({ user, type }: FooterProps) => {
    const router = useRouter()

    const handleLogOut =async () => {
        const loggedOut = await logOut()

        if(loggedOut) router.push('/sign-in')
    } 
    return (
        <footer className='footer'>
            <div className={`${type === 'mobile' ? 'footer_name-mobile' : 'footer-name'} `}>
                <p className='text-xl font-bold text-gray-700'>{user?.name[0].toUpperCase()}</p>
            </div>
            <div className={`${type === 'mobile' ? 'footer_email-mobile' : 'footer-email'} `}>
                <h1 className='text-14 text-gray-700 font-semibold truncate'>
                    {user?.name}
                </h1>
                <p className='font-normal truncate text-14 text-gray-600'>
                    {user?.email}
                </p>
            </div>

            <div className='footer_image' onClick={handleLogOut}>
                <Image
                src={'/icons/logout.svg'}
                fill
                alt='logout icon'
                />
            </div>
        </footer>
    )
}

export default Footer