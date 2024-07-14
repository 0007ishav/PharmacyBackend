// Navbar.tsx

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from './ui/button';

const Navbar = () => {
    const { data: session } = useSession();

    const [redirectUrl, setRedirectUrl] = useState<string>('');

    useEffect(() => {
        if (session?.user) {
            const user: User = session.user as User;
            const url = new URL('https://ishan-medicose.vercel.app/');
            url.searchParams.set('username', user?.username || '');
            url.searchParams.set('email', user?.email || '');
            setRedirectUrl(url.toString());
        }
    }, [session]);

    return (
        <nav className='p-4 md:p-6 shadow-md'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a href="#" className='text-xl font-bold mb-4 md:mb-0'>Ishan Medicose</a>
                {
                    session ? (
                        <>
                            <span className='mr-4'>Welcome, {session.user?.username || session.user?.email}</span>
                            <Button className='w-full md:w-auto' onClick={() => signOut()}>Logout</Button>
                        </>
                    ) : (
                        <Link href='/sign-in'>
                            <Button className='w-full md:w-auto'>Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;
