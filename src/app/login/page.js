import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function LoginPage() {
    return (
        <main>
            <LoginLink>Sign in</LoginLink>
            <RegisterLink>Sign up</RegisterLink>
        </main>
    )
}
