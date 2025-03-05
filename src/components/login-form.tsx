"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/config/firebaseConfig"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const provider = new GoogleAuthProvider()
  auth.languageCode = "he"

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center justify-center items-center content-center">
          <CardTitle className="text-2xl">
            היי עומרי, התחבר לחשבון שלך{" "}
          </CardTitle>
          <CardDescription className="w-8/12">
            פשוט לחץ על התחברות עם גוגל ובחר את חשבון הגוגל שלך
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Button
              onClick={signInWithGoogle}
              variant="outline"
              className="w-full"
            >
              התחבר עם גוגל
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
