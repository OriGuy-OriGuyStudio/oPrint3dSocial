"use client";
import React, { useEffect, useState } from "react";
import ClientCollapse from "./ClientCollapse";
import { Client } from "@/types/Client";
import ManageClientsTitles from "@/components/myComp/manageClientsPage/ManageClientsTitles";
import ManageClientH3Title from "@/components/myComp/manageClientsPage/ManageClientH3Title";
import ManageClientAddClientForm from "@/components/myComp/manageClientsPage/ManageClientAddClientForm";
import { rubikFont } from "@/types/font";
import { fetchAllDocuments } from "@/service/firebaseService";
import { log } from "console";
import { useClientContext } from "@/context/ClientContext";

function ManageClients() {
  const { clients, fetchClients } = useClientContext();
  useEffect(() => {
    fetchAllDocuments("clients")
      .then((data) => {
        console.log(data);
        fetchClients();
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);
  return (
    <main className="mt-16 flex w-full flex-col items-center justify-center gap-8 bg-[#3a3a3a] px-6 lg:items-start">
      <ManageClientsTitles />
      <div className="flex h-fit w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-start">
        <div className="mt-2 w-full rounded-3xl bg-gray-100 px-6 py-6 lg:mt-0">
          <ManageClientH3Title title="הוספת לקוח חדש" />
          <ManageClientAddClientForm />
        </div>
        <div className="mt-6 mb-16 h-fit w-full rounded-3xl bg-gray-100 px-6 py-6 lg:mt-0">
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
      </div>
    </main>
  );
}

export default ManageClients;
