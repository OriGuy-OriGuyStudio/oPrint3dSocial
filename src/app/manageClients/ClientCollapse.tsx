import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Client } from "@/types/Client";
import { rubikFont } from "@/types/font";
import ClientCollapseDetails from "@/components/myComp/ClientCollapseDetails";
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
import { toast, Toaster } from "sonner";
import { useClientContext } from "@/context/ClientContext";

interface ClientCollapseProps {
  client: Client[];
}

function ClientCollapse({ client }: ClientCollapseProps) {
  const { deleteClient } = useClientContext();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleDelete = async (clientId: string, name: string) => {
    setLoadingStates((prev) => ({ ...prev, [clientId]: true }));
    try {
      await deleteClient(clientId);
      showToast(name);
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [clientId]: false }));
    }
  };

  function showToast(name: string) {
    toast(`${name} נמחק בהצלחה 😊`, {
      action: {
        label: "סגור",
        onClick: () => console.log("Undo"),
      },
    });
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return client.map((client, index) => (
    <div key={index} className="border-b-2 py-3">
      <Collapsible
        open={openIndex === index}
        onOpenChange={() => handleToggle(index)}
      >
        <CollapsibleTrigger
          className={`${rubikFont.className} text-xl font-bold ${
            openIndex === index ? "text-indigo-500" : ""
          }`}
        >
          {client.name}
        </CollapsibleTrigger>
        <CollapsibleContent
          className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
            openIndex === index ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="mt-3 flex flex-col items-end">
            <ClientCollapseDetails
              Icon={FaFacebook}
              platform="facebook"
              data={client.facebook ?? "אין קישור, ניתן להוסיף"}
              clientId={client.id}
            />
            <ClientCollapseDetails
              Icon={FaInstagram}
              platform="instagram"
              data={client.instagram ?? "אין קישור, ניתן להוסיף"}
              clientId={client.id}
            />
            <ClientCollapseDetails
              Icon={FaLinkedin}
              platform="linkedin"
              data={client.linkedin ?? "אין קישור, ניתן להוסיף"}
              clientId={client.id}
            />
            <ClientCollapseDetails
              Icon={FaTiktok}
              platform="tiktok"
              data={client.tiktok ?? "אין קישור, ניתן להוסיף"}
              clientId={client.id}
            />
            <ClientCollapseDetails
              Icon={FaTwitter}
              platform="twitter"
              data={client.twitter ?? ""}
              clientId={client.id}
            />
            <ClientCollapseDetails
              Icon={FaWhatsapp}
              platform="whatsapp"
              data={client.whatsapp ?? "אין קישור, ניתן להוסיף"}
              clientId={client.id}
            />
            <ClientCollapseDetails
              Icon={FaYoutube}
              platform="youtube"
              data={client.youtube ?? "אין קישור, ניתן להוסיף"}
              clientId={client.id}
            />
            <ClientCollapseDetails
              Icon={FaReact}
              platform="website"
              data={client.website ?? "אין קישור, ניתן להוסיף"}
              clientId={client.id}
            />
            <button
              onClick={() => handleDelete(client.id, client.name)}
              className={`mt-4 rounded-lg bg-red-500 px-3 py-2 font-black text-gray-100 ${rubikFont.className}`}
            >
              {loadingStates[client.id] ? "מוחק..." : "מחק לקוח"}
            </button>
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
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ));
}

export default ClientCollapse;
