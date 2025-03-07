import { Button } from "@/components/ui/button";
import { rubikFont } from "@/types/font";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import ManageClientFormInput from "./ManageClientFormInput";
import { createDocument } from "@/service/firebaseService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/types/formSchema";
import { useClientContext } from "@/context/ClientContext";
import { Client } from "@/types/Client";

function ManageClientAddClientForm() {
  const [showLoading, setLoading] = useState(false);
  const { addClient } = useClientContext();
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
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await addClient(form.getValues() as Client);
      showToast(form.getValues().name);
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddClient() {
    await createDocument("clients", form.getValues());
  }

  function showToast(name: string) {
    toast(`${name} התווסף בהצלחה 😊`, {
      action: {
        label: "סגור",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <ManageClientFormInput
          control={form.control}
          label="שם הלקוח"
          name="name"
        />
        <ManageClientFormInput
          control={form.control}
          label="פייסבוק"
          name="facebook"
        />
        <ManageClientFormInput
          control={form.control}
          label="אינסטגרם"
          name="instagram"
        />
        <ManageClientFormInput
          control={form.control}
          label="לינקדין"
          name="linkedin"
        />
        <ManageClientFormInput
          control={form.control}
          label="טוויטר"
          name="twitter"
        />
        <ManageClientFormInput
          control={form.control}
          label="וואטסאפ"
          name="whatsapp"
        />
        <ManageClientFormInput
          control={form.control}
          label="טיקטוק"
          name="tiktok"
        />
        <ManageClientFormInput
          control={form.control}
          label="יוטיוב"
          name="youtube"
        />
        <ManageClientFormInput
          control={form.control}
          label="אתר"
          name="website"
        />
        <Button
          className={`mt-4 flex w-full items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-gray-100 shadow-md shadow-indigo-300 ${rubikFont.className} font-extrabold`}
          type="submit"
        >
          {showLoading ? "מעלה לקוח לשרת..." : "הוסף לקוח"}
        </Button>
        <Toaster
          toastOptions={{
            style: {
              background: "#BCD979",
              color: "#202020",
              borderWidth: "0px",
              fontWeight: 900,
            },
          }}
        />
      </form>
    </FormProvider>
  );
}

export default ManageClientAddClientForm;
