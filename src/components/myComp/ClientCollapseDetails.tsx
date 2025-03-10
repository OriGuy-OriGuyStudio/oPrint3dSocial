import { useClientContext } from "@/context/ClientContext";
import { rubikFont } from "@/types/font";
import React, { useRef, useState } from "react";
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
  const [color, setColor] = useState(data);

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

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    handleEdit(platform, newColor);
  };
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <li className={`${rubikFont.className} mb-2 w-full border-b-2 pb-2`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 flex-shrink-0">
            <Icon className="text-indigo-500" size={32} />
          </div>
          <div>
            <p className="">{data}</p>
          </div>
        </div>
        {platform === "color" ||
        platform === "textAndIconColor" ||
        platform === "headerColor" ||
        platform === "buttonColor" ? (
          <input
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            onBlur={async () => {
              await handleEdit(platform, color);
              if (colorInputRef.current) {
                colorInputRef.current.blur();
              }
            }}
            className="h-6 w-8 rounded-2xl border-0 border-none p-0"
          />
        ) : (
          <div>
            <FaEdit
              size={20}
              onClick={() => {
                const newUrl = window.prompt(`הכנס קישור חדש ל${platform}`);
                if (newUrl !== null) {
                  handleEdit(platform, newUrl);
                }
              }}
              className=""
            />
          </div>
        )}
      </div>
    </li>
  );
}

export default ClientCollapseDetails;
