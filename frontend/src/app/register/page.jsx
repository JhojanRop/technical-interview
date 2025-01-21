import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/Logo";
import { Box } from "@mui/material";
import Link from "next/link";

export default async function Register () {
  return (
    <div className="w-full h-screen flex">

      <main className="w-full md:w-3/5 bg-gray-100 flex flex-col">
        <section className="w-5/6 max-w-md mx-auto flex-grow flex flex-col justify-center space-y-8">
          <Box>
            <Logo />
          </Box>

          <RegisterForm />

          <p className="text-center text-gray-600">
            Have an account?{' '}
            <Link href="/login" className="text-blue-500 underline">Login now</Link>
          </p>
        </section>
        <footer className="py-4">
          <p className="text-center text-gray-600">
            Made with 💙 by Jhojan
          </p>
        </footer>
      </main>
      <aside className="hidden w-2/5 md:block bg-blue-800"></aside>
    </div>
  )
}