import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function UserInfo() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    return (
        <div className="select-none text-[#0f0f0f] sm:block hidden">
            {user ? <p>{user.given_name}</p> : <p>Loading...</p>}
        </div>
    )
}