"use client";
import { useClientContext } from "@/context/ClientContext";
import { Client } from "@/types/Client";
import { rubikFont } from "@/types/font";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ClientProtfolio() {
  const params = useParams<{ id: string }>();
  const { getClient } = useClientContext();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    getClient(params.id)
      .then((data) => {
        setClient(data);
      })
      .catch((error) => {
        console.error("Error getting client: ", error);
      });
  }, []);

  return (
    <div className="mx-6 min-h-screen items-center justify-center">
      <main className="rounded-3xl bg-gray-100 px-6 py-3">
        <h1
          className={`${rubikFont.className} text-center text-2xl font-black`}
        >
          עמודי הסושיאל של {client?.name}
        </h1>
        <h2
          className={`${rubikFont.className} text-md text-center font-normal`}
        >
          לחצו והצטרפו לעמודים הרשמיים שלי!
        </h2>
        <div>
          <ul>
            <li
              className={`${rubikFont.className} mb-2 w-full border-b-2 pb-2`}
            >
              {client?.facebook}
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ClientProtfolio;
