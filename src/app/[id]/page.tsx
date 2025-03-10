"use client";
import React, { JSX, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useClientContext } from "@/context/ClientContext";
import { Client } from "@/types/Client";
import { rubikFont } from "@/types/font";
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
import { doc } from "firebase/firestore";

const ClientProtfolio = () => {
  const params = useParams<{ id: string }>();
  const { getClient } = useClientContext();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClient(params.id)
      .then((data) => {
        setClient(data);
        setLoading(false);
        document.body.style.backgroundColor = data?.color || "#202020";
      })
      .catch((error) => {
        console.error("Error getting client: ", error);
        setLoading(false);
      });
  }, []);

  const iconMapping: { [key: string]: { icon: JSX.Element; label: string } } = {
    facebook: {
      icon: (
        <FaFacebook style={{ color: client?.textAndIconColor }} size={32} />
      ),
      label: "פייסבוק",
    },
    instagram: {
      icon: (
        <FaInstagram style={{ color: client?.textAndIconColor }} size={32} />
      ),
      label: "אינסטגרם",
    },
    linkedin: {
      icon: (
        <FaLinkedin style={{ color: client?.textAndIconColor }} size={32} />
      ),
      label: "לינקדאין",
    },
    tiktok: {
      icon: <FaTiktok style={{ color: client?.textAndIconColor }} size={32} />,
      label: "טיקטוק",
    },
    whatsapp: {
      icon: (
        <FaWhatsapp style={{ color: client?.textAndIconColor }} size={32} />
      ),
      label: "וואטסאפ",
    },
    youtube: {
      icon: <FaYoutube style={{ color: client?.textAndIconColor }} size={32} />,
      label: "יוטיוב",
    },
    twitter: {
      icon: <FaTwitter style={{ color: client?.textAndIconColor }} size={32} />,
      label: "טוויטר",
    },
    website: {
      icon: <FaReact style={{ color: client?.textAndIconColor }} size={32} />,
      label: "אתר",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p
          className={`${rubikFont.className} text-3xl font-black`}
          style={{ color: client?.headerColor }}
        >
          טוען...
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative content-center min-h-screen px-3 bg-center bg-cover custom-overlay bg-blend-overlay"
      style={{
        backgroundColor: client?.color || "black",
      }}
    >
      <main className="px-3 py-6 bg-gray-100 shadow-xl rounded-3xl">
        <h1
          className={`${rubikFont.className} text-center text-4xl font-black`}
          style={{ color: client?.headerColor }}
        >
          עמודי הסושיאל של{" "}
          <span style={{ color: client?.headerColor }}>{client?.name}</span>
        </h1>
        <h2
          className={`${rubikFont.className} mt-2 text-center text-xl font-normal`}
          style={{ color: client?.headerColor }}
        >
          לחצו והצטרפו לעמודים הרשמיים שלי!
        </h2>

        <ul className="flex flex-row flex-wrap items-center justify-center gap-3 pl-2 mt-8">
          {client &&
            Object.entries(client)
              .filter(
                ([key, value]) =>
                  value !== "" && key !== "name" && key !== "color" && key !== "buttonColor" && key !== "headerColor" && key !== "textAndIconColor",
              )
              .map(([key, value], index) => (
                <li
                  className={`${rubikFont.className} w-[48%]`}
                  key={`${key}-${index}`}
                >
                  {iconMapping[key] && (
                    <button className="w-[100%] rounded-md bg-[#202020]">
                      <span
                        className="block w-[100%] -translate-x-2 -translate-y-2 items-center justify-center rounded-md border-black px-4 py-2 text-xl transition-all hover:-translate-y-3 active:translate-x-0 active:translate-y-0"
                        style={{ backgroundColor: client?.buttonColor }}
                      >
                        <a
                          target="_blank"
                          href={value}
                          className="flex flex-row items-center gap-4"
                        >
                          <span
                            style={{
                              color: client?.textAndIconColor,
                            }}
                          >
                            {iconMapping[key].icon}
                          </span>

                          <span
                            className="text-gray-100 capitalize"
                            style={{ color: client?.textAndIconColor }}
                          >
                            {iconMapping[key].label}
                          </span>
                        </a>
                      </span>
                    </button>
                  )}
                </li>
              ))}
        </ul>
      </main>
    </div>
  );
};

export default ClientProtfolio;
