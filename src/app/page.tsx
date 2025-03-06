"use client"

import { auth } from "@/config/firebaseConfig"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Rubik } from "next/font/google"
import { useRouter } from "next/navigation"
const rubikFont = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
})
export default function Home() {
  const router = useRouter()
  const provider = new GoogleAuthProvider()
  auth.languageCode = "he"
  async function handleSignIn() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        router.push("/manageClients")
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-950">
      <main className="w-full max-w-sm">
        <div className=" shadow-sm shadow-gray-100 bg-gray-100 px-12 py-6 rounded-3xl flex justify-center items-center flex-col  ">
          <h1
            className={`font-black text-3xl ${rubikFont.className} text-gray-950`}
          >
            היי עומרי 😊
          </h1>
          <h2
            className={`font-normal text-ms ${rubikFont.className} text-center mb-6 text-gray-500`}
          >
            לחץ על התחבר עם גוגל על מנת להיכנס לפאנל הניהול
          </h2>
          <button
            className={` shadow-md shadow-indigo-300  rounded-lg flex items-center justify-center bg-indigo-500 px-4 py-2 text-gray-100 ${rubikFont.className} font-extrabold`}
            onClick={handleSignIn}
            type="button"
          >
            <p>התחבר עם גוגל</p>
          </button>
        </div>
      </main>
    </div>
  )
}
