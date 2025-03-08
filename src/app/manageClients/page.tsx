"use client";
import React, { useEffect } from "react";
import ClientCollapse from "./ClientCollapse";
import ManageClientsTitles from "@/components/myComp/manageClientsPage/ManageClientsTitles";
import ManageClientH3Title from "@/components/myComp/manageClientsPage/ManageClientH3Title";
import ManageClientAddClientForm from "@/components/myComp/manageClientsPage/ManageClientAddClientForm";
import { rubikFont } from "@/types/font";
import { fetchAllDocuments, signOut } from "@/service/firebaseService";
import { useClientContext } from "@/context/ClientContext";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ManageClients() {
  const { clients, fetchClients } = useClientContext();
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllDocuments("clients");
        fetchClients();
      } catch (error) {
        console.error("Error getting documents: ", error);
        router.replace("/");
      }
    };

    fetchData();
  }, [fetchClients, router]);

  const handleSignOut = () => {
    signOut()
      .then(() => {
        console.log("Signed out successfully");
        router.replace("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <main className="mt-16 flex w-full flex-col items-center justify-center gap-8 bg-[#3a3a3a] px-6 lg:items-start">
      <ManageClientsTitles />
      <button
        onClick={handleSignOut}
        className="mt-4 cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-bold text-white"
      >
        Sign Out
      </button>
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
