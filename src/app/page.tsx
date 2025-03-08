"use client";

import { Rubik } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const rubikFont = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
});

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const auth = getAuth();
    if (auth.currentUser) {
      router.push("/manageClients");
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Sign-in successful!");
        // Redirect to the desired page
        router.push("/manageClients");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert("Error signing in: " + errorMessage);
      });
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[#3a3a3a] p-6 md:p-10">
      <main className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center rounded-3xl bg-gray-100 px-12 py-6 shadow-sm shadow-gray-100">
          <h1
            className={`text-3xl font-black ${rubikFont.className} text-gray-950`}
          >
            היי עומרי 😊
          </h1>
          <h2
            className={`text-ms font-normal ${rubikFont.className} mb-6 text-center text-gray-500`}
          >
            לחץ על התחבר עם דוא"ל על מנת להיכנס לפאנל הניהול
          </h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="דואר אלקטרוני"
            className={`mb-4 rounded border p-2 ${rubikFont.className}`}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="סיסמה"
            className={`mb-4 rounded border p-2 ${rubikFont.className}`}
          />
          <button
            className={`flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-gray-100 shadow-md shadow-indigo-300 ${rubikFont.className} font-extrabold`}
            onClick={handleSignIn}
            type="button"
          >
            <p>התחבר עם דוא"ל וסיסמה</p>
          </button>
        </div>
      </main>
    </div>
  );
}
