"use client";
import React, { useEffect, useState } from "react";
import ClientCollapse from "./ClientCollapse";
import { Client } from "@/types/Client";
import ManageClientsTitles from "@/components/myComp/manageClientsPage/ManageClientsTitles";
import ManageClientH3Title from "@/components/myComp/manageClientsPage/ManageClientH3Title";
import ManageClientAddClientForm from "@/components/myComp/manageClientsPage/ManageClientAddClientForm";
import { rubikFont } from "@/types/font";

function ManageClients() {
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    
  });
  return (
    <main className="mt-16 flex flex-col items-center justify-center px-6">
      <ManageClientsTitles />

      <div className="mt-10 w-full rounded-3xl bg-gray-100 px-6 py-6 lg:w-4/6">
        <ManageClientH3Title title="הוספת לקוח חדש" />
        <ManageClientAddClientForm />
      </div>
      <div className="mt-6 w-full rounded-3xl bg-gray-100 px-6 py-6 lg:w-4/6">
        <ManageClientH3Title title="לקוחות קיימים" />
        {clients.length === 0 ? (
          <p
            className={`${rubikFont.className} font-bold text-balance text-red-500`}
          >
            אין עדיין לקוחות 🥹, כדאי להוסיף
          </p>
        ) : (
          <ClientCollapse client={clients} />
        )}
      </div>
    </main>
  );
}

export default ManageClients;
