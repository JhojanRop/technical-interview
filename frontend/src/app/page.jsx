'use client'
import IndexLayout from "@/components/layout/IndexLayout"
import { useGetInitialInfo } from "@/hooks/useGetInitialInfo"
import Logo from "@/Logo"
import { Alert, Container } from "@mui/material"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function Home () {
  const { cards, loans, errors, user } = useGetInitialInfo()
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <Container className="relative h-screen">
      <main className="pt-3">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        {errors && <p>{errors}</p>}
        <IndexLayout cards={cards} loans={loans} />

        <footer className="sm:w-full absolute bottom-0 py-6 border-t">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Logo />
              <p className="font-medium text-base md:text-lg">Bank Management System</p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500 h-10 px-4 py-2"
              onClick={handleLogout}
            >
              Logout
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-8V4m0 9v6" />
              </svg>
            </button>
          </div>
        </footer>
      </main>
    </Container>
  )
}