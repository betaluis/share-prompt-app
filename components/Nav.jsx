"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {

    const isLogged = true;

    const [providers, setProviders] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        const setProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        }

        setProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 p-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image 
                    src="/assets/images/logo.svg"
                    alt="Prompt Share Logo"
                    className="object-contain"
                    width={30}
                    height={30}
                />
                <p className="logo_text">Prompt Share</p>
            </Link>

            {/* Desktop */}
            <div className="sm:flex hidden">
                {isLogged ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Prompt
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                        <Link href="/profile">
                            <Image 
                                src="/assets/images/logo.svg" 
                                alt="profile" 
                                width={37} 
                                height={37} 
                                className="rounded-full" 
                            />
                        </Link>
                    </div>
                ) : (
                        <>
                            { providers 
                                ? Object.values(providers).map((provider) => (
                                    <button 
                                        type="button" 
                                        onClick={() => signIn(provider.id)} 
                                        className="black_btn"
                                        key={provider.name}
                                    >
                                        Sign in
                                    </button>
                                ))
                                : null 
                            }
                        </>
                    )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {isLogged ? (
                    <div className="flex">
                        <Image 
                            src="/assets/images/logo.svg"
                            alt="profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleMenu((prev) => !prev)}
                        />
                    </div>
                ) : 
                    <>
                        { providers 
                            ? Object.values(providers).map((provider) => (
                                <button 
                                    type="button" 
                                    onClick={() => signIn(provider.id)} 
                                    className="black_btn"
                                    key={provider.name}
                                >
                                    Sign in
                                </button>
                            ))
                            : null 
                        }
                    </>

                }
            </div>
        </nav>
    )
}

export default Nav;
