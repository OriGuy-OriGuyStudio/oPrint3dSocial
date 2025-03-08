"use client";
import { useClientContext } from "@/context/ClientContext";
import { Client } from "@/types/Client";
import { rubikFont } from "@/types/font";
import { useParams } from "next/navigation";
import React, { JSX, useEffect, useLayoutEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaReact,
  FaTwitter,
} from "react-icons/fa";

function ClientProtfolio() {
  const params = useParams<{ id: string }>();
  const { getClient } = useClientContext();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClient(params.id)
      .then((data) => {
        setClient(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting client: ", error);
        setLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    if (client?.color) {
      document.body.style.backgroundColor = client.color;
    }
  }, [client]);

  const iconMapping: { [key: string]: { icon: JSX.Element; label: string } } = {
    facebook: {
      icon: <FaFacebook className="text-[#F55274]" size={32} />,
      label: "פייסבוק",
    },
    instagram: {
      icon: <FaInstagram className="text-[#F55274]" size={32} />,
      label: "אינסטגרם",
    },
    linkedin: {
      icon: <FaLinkedin className="text-[#F55274]" size={32} />,
      label: "לינקדאין",
    },
    tiktok: {
      icon: <FaTiktok className="text-[#F55274]" size={32} />,
      label: "טיקטוק",
    },
    whatsapp: {
      icon: <FaWhatsapp className="text-[#F55274]" size={32} />,
      label: "וואטסאפ",
    },
    youtube: {
      icon: <FaYoutube className="text-[#F55274]" size={32} />,
      label: "יוטיוב",
    },
    twitter: {
      icon: <FaTwitter className="text-[#F55274]" size={32} />,
      label: "טוויטר",
    },
    website: {
      icon: <FaReact className="text-[#F55274]" size={32} />,
      label: "אתר",
    },
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p
          className={`${rubikFont.className} text-3xl font-black text-gray-100`}
        >
          טוען...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`mx-6 min-h-screen content-center items-center justify-center`}
      style={{ backgroundColor: client?.color || "black" }}
    >
      <main className="rounded-3xl bg-gray-100 px-3 py-6 shadow-xl">
        <h1
          className={`${rubikFont.className} text-center text-4xl font-black`}
        >
          עמודי הסושיאל של{" "}
          <span className="text-[#3521AB]">{client?.name}</span>
        </h1>
        <h2
          className={`${rubikFont.className} mt-2 text-center text-xl font-normal`}
        >
          לחצו והצטרפו לעמודים הרשמיים שלי!
        </h2>
        <div className="w-full">
          <ul className="mt-8 flex flex-row flex-wrap justify-center gap-4 pl-2">
            {client &&
              Object.entries(client)
                .sort(([keyA], [keyB]) => {
                  const order = ["facebook", "instagram", "tiktok"];
                  const indexA = order.indexOf(keyA);
                  const indexB = order.indexOf(keyB);
                  if (indexA === -1 && indexB === -1) return 0;
                  if (indexA === -1) return 1;
                  if (indexB === -1) return -1;
                  return indexA - indexB;
                })
                .map(([key, value], index) => {
                  return value === "" || key === "name" ? (
                    <></>
                  ) : (
                    <li
                      className={`${rubikFont.className}`}
                      key={`${key}-${index}`}
                    >
                      {iconMapping[key] && (
                        <button className="w-[165px] items-center justify-center rounded-md bg-[#202020]">
                          <span className="block w-[165px] -translate-x-2 -translate-y-2 items-center justify-center rounded-md border-2 border-black bg-[#3521AB] px-4 py-2 text-xl transition-all hover:-translate-y-3 active:translate-x-0 active:translate-y-0">
                            <a
                              target="_blank"
                              href={value}
                              className="flex items-center gap-4"
                            >
                              {iconMapping[key].icon}
                              <span className="text-gray-100 capitalize">
                                {iconMapping[key].label}
                              </span>
                            </a>
                          </span>
                        </button>
                      )}
                    </li>
                  );
                })}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ClientProtfolio;
