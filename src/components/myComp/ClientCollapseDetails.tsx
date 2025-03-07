import { useClientContext } from "@/context/ClientContext";
import { rubikFont } from "@/types/font";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface ClientCollapseDetailsProps {
  platform: string;
  data: string;
  Icon: IconType;
  clientId: string;
}

function ClientCollapseDetails({
  platform,
  data,
  Icon,
  clientId,
}: ClientCollapseDetailsProps) {
  const { updateClient } = useClientContext();
  const handleEdit = async (platform: string, newUrl: string) => {
    try {
      updateClient(clientId, platform, "clients", newUrl);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDelete = (platform: string) => {
    console.log(`Delete ${platform}`);
  };
  return (
    <li className={`${rubikFont.className} mb-2 w-full border-b-2 pb-2`}>
      <div className="flex items-center justify-between gap-2 align-middle">
        <div className="flex items-center gap-2">
          {<Icon className="text-indigo-500" size={32} />}
          <p>{data}</p>
        </div>
        <FaEdit
          size={20}
          onClick={() => {
            const newUrl = window.prompt(`הכנס קישור חדש ל${platform}`);
            if (newUrl !== null) {
              handleEdit(platform, newUrl);
            }
          }}
        />
      </div>

      <div className="flex justify-end gap-4"></div>
    </li>
  );
}

export default ClientCollapseDetails;
