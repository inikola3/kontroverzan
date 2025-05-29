'use client'
import { IoArrowForwardOutline } from "react-icons/io5"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex flex-col justify-center items-center gap-[50px] h-dvh w-dvw bg-black">
      <div className="flex justify-center items-center rounded-full bg-white h-1/2 aspect-square animate-fadeUp">
        <img src="/logoBlack.svg" alt="Black logo" className="h-1/2 w-auto" />
      </div>

      <button
        onClick={() => router.push('/dashboard')}
        className="flex flex-row gap-[5px] justify-center items-center w-[150px] h-[45px] p-5 bg-white text-black rounded-[5px] text-lg hover:scale-[1.2] transition duration-150 ease-in-out group"
      >
        Login
        <IoArrowForwardOutline
          size={25}
          className="transition-transform duration-300 ease-in-out group-hover:translate-x-3"
        />
      </button>

      {/* <LoginLink className="flex flex-row gap-[5px] justify-center items-center w-[150px] h-[45px] p-5 bg-white text-black rounded-[5px] text-lg hover:scale-[1.2] transition duration-150 ease-in-out group">
        Login <IoArrowForwardOutline
          size={25}
          className="transition-transform duration-300 ease-in-out group-hover:translate-x-3"
        />
      </LoginLink> */}

    </main>
  );
}
