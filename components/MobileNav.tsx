"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants/index"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer"


const MobileNav = ({ user }: MobileNavProps) => {
    const pathName = usePathname()
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={'/icons/hamburger.svg'}
                        height={30}
                        width={30}
                        alt='menu button'
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-white'>
                    <Link href='/' className="flex  cursor-pointer items-center gap-1 px-4">
                        <Image
                            src={"/icons/logo.svg"}
                            height={34}
                            width={34}
                            alt="Horizon"
                        />
                        <h1 className='text-36 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                    </Link>
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full gap-6 text-white flex-col pt-16">
                                {sidebarLinks.map(item => {
                                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                                    return (
                                        <SheetClose asChild>
                                            <Link href={item.route}
                                                key={item.label}
                                                className={cn('mobilenav-sheet_close w-full', {
                                                    'bg-bankGradient': isActive
                                                })}
                                            >
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    height={20}
                                                    width={20}
                                                    className={cn({ 'brightness-[3] invert-0': isActive })}
                                                />
                                                <p className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>{item.label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                                USER
                            </nav>
                        </SheetClose>
                        <Footer user={user}/>
                    </div>

                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav