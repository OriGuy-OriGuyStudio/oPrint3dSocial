import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Client } from "@/types/Client"
import { rubikFont } from "@/types/font"
import React from "react"
import { Control, UseFormReturn } from "react-hook-form"

interface ManageClientFormInputProps {
  control?:
    | Control<{
        name: string
        facebook?: string | undefined
        instagram?: string | undefined
        twitter?: string | undefined
        linkedin?: string | undefined
        whatsapp?: string | undefined
        tiktok?: string | undefined
        youtube?: string | undefined
        website?: string | undefined
      }>
    | undefined
  label: string
  name: keyof Client
}

function ManageClientFormInput({
  control,
  label,
  name,
}: ManageClientFormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className={` ${rubikFont.className} text-gray-950`}>
            {label}
          </FormLabel>
          <FormControl className="border-indigo-100 border-2 focus-within:border-indigo-500 ">
            <Input
              className={` ${rubikFont.className}  text-gray-950 text-right`}
              placeholder={label}
              {...field}
              onFocus={() => {}}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ManageClientFormInput
