import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function UserInfo() {
    const demoUser = true

    const { getUser } = getKindeServerSession()
    const user = !demoUser ? await getUser() : { given_name: 'Demo', family_name: 'User', email: 'demouser@demo.com' }

    return (
        <div className="select-none text-[#0f0f0f] sm:block hidden">
            {user ? <p>{user.given_name}</p> : <p>Loading...</p>}
        </div>
    )
}