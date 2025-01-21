'use client'
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/Logo";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login () {
  const router = useRouter();

  const handleLoginSuccess = (token, user) => {
    document.cookie = `token=${token}; path=/`;
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/');
  };

  return (
    <div className="w-full h-screen flex">
      <aside className="hidden w-2/5 md:block bg-blue-800"></aside>

      <main className="w-full md:w-3/5 bg-gray-100 flex flex-col">
        <section className="w-5/6 max-w-md mx-auto flex-grow flex flex-col justify-center space-y-8">
          <Box>
            <Logo />
          </Box>

          <LoginForm onSuccess={handleLoginSuccess} />

          <p className="text-center text-gray-600">
            Need an account?{' '}
            <Link href="/register" className="text-blue-500 underline">Register now</Link>
          </p>
        </section>
        <footer className="py-4">
          <p className="text-center text-gray-600">
            Made with 💙 by Jhojan
          </p>
        </footer>
      </main>
    </div>
  )
}