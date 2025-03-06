"use client"
import React, { act, useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ClientCollapse from "./ClientCollapse"
import { Client } from "@/types/Client"
import { rubikFont } from "@/types/font"
import { createDocument } from "@/service/firebaseService"
import { Spinner } from "@heroui/spinner"
import { toast } from "sonner"
const formSchema = z.object({
  name: z
    .string({
      required_error: "שדה חובה, לא יכול להיות ריק",
    })
    .nonempty({
      message: "שדה חובה, לא יכול להיות ריק",
    }),
  facebook: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  instagram: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  twitter: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  linkedin: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  whatsapp: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  tiktok: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  youtube: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
  website: z
    .string()
    .url({
      message: "כתובת לא תקינה",
    })
    .optional()
    .or(z.string()),
})

function ManageClients() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      whatsapp: "",
      tiktok: "",
      youtube: "",
      website: "",
    },
  })
  const [showLoading, setLoading] = useState(false)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      await handleAddClient()
      form.reset()
    } catch (error) {
      console.error("Error adding document: ", error)
    } finally {
      setLoading(false)
      toast("הלקוח התווסף בהצלחה 😊", {
        // description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    }
  }
  async function handleAddClient() {
    await createDocument("clients", form.getValues())
  }
  const data: Client[] = [
    {
      name: "אורי גיא",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      whatsapp: "https://whatsapp.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
    },
    {
      name: "לי גיא",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      whatsapp: "https://whatsapp.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
    },
  ]
  return (
    <main className="flex flex-col justify-center items-center h-screen px-6">
      <div className="mb-4">
        <h1
          className={`text-4xl font-black ${rubikFont.className} text-center text-gray-100`}
        >
          ברוכה הבאה לפאנל ניהול הלקוחות{" "}
        </h1>
        <h2
          className={`text-md mt-2 font-normal ${rubikFont.className} text-center text-gray-100`}
        >
          פה אתה יכול להוסיף לקוחות, למחוק לקוחות ולעדכן לקוחות
        </h2>
      </div>

      <div className="w-full lg:w-4/6 bg-gray-100 rounded-3xl px-6 py-6">
        <h3
          className={`text-3xl mb-2 font-black ${rubikFont.className} text-center text-gray-950`}
        >
          הוסף לקוח
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    שם העסק/לקוח
                  </FormLabel>
                  <FormControl className="border-indigo-100 border-2 focus-within:border-indigo-500 ">
                    <Input
                      className={` ${rubikFont.className}  text-gray-950 text-right`}
                      placeholder="שם העסק/לקוח"
                      {...field}
                      onFocus={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור לפייסבוק
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950 `}
                      placeholder="קישור לפייסבוק"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור לאינסטגרם
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950`}
                      placeholder="קישור לאינסטגרם"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור ללינקדין
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950`}
                      placeholder="קישור ללינקדין"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור לטיקטוק
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950`}
                      placeholder="קישור לטיקטוק"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור לאקס
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950`}
                      placeholder="קישור לאקס"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור לוואטסאפ
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950`}
                      placeholder="קישור לוואטסאפ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור ליוטיוב
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950`}
                      placeholder="קישור ליוטיוב"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={` ${rubikFont.className} text-gray-950`}
                  >
                    קישור לאתר
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={` ${rubikFont.className} text-gray-950`}
                      placeholder="קישור לאתר"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={` shadow-md shadow-indigo-300  rounded-lg flex items-center justify-center bg-indigo-500 px-4 py-2 text-gray-100 w-full ${rubikFont.className} font-extrabold`}
              type="submit"
            >
              {showLoading ? "מעלה לקוח לשרת..." : "הוסף לקוח"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-full lg:w-4/6 bg-gray-100 rounded-3xl px-6 py-6 mt-6">
        <h3
          className={`text-3xl mb-2 font-black ${rubikFont.className} text-right text-gray-950`}
        >
          הלקוחות שלך
        </h3>
        <ClientCollapse client={data} />
      </div>
    </main>
  )
}

export default ManageClients
