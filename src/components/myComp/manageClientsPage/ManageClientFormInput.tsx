import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Client } from "@/types/Client";
import { rubikFont } from "@/types/font";
import React from "react";
import { Control, UseFormReturn } from "react-hook-form";

interface ManageClientFormInputProps {
  control: Control<
    {
      name: string;
      facebook?: string | undefined;
      instagram?: string | undefined;
      twitter?: string | undefined;
      linkedin?: string | undefined;
      whatsapp?: string | undefined;
      tiktok?: string | undefined;
      youtube?: string | undefined;
      website?: string | undefined;
      color?: string | undefined;
      type?: string | undefined;
      url?: string | undefined;
    },
    undefined
  >;
  label: string;
  name:
    | "name"
    | "facebook"
    | "instagram"
    | "twitter"
    | "linkedin"
    | "whatsapp"
    | "tiktok"
    | "youtube"
    | "website"
    | "color"
    | "url";
  type?: string;
}

function ManageClientFormInput({
  control,
  label,
  name,
  type,
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
          <FormControl className="border-2 border-indigo-100 focus-within:border-indigo-500">
            <Input
              className={` ${rubikFont.className} text-right text-gray-950`}
              placeholder={label}
              {...field}
              onFocus={() => {}}
              type={type === "color" ? "color" : "text"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ManageClientFormInput;
