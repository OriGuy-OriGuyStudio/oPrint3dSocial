import { rubikFont } from "@/types/font"
import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { IconType } from "react-icons/lib"

interface ClientCollapseDetailsProps {
  platform: string
  data: string
  Icon: IconType
}

function ClientCollapseDetails({
  platform,
  data,
  Icon,
}: ClientCollapseDetailsProps) {
  const handleEdit = (platform: string) => {
    console.log(`Edit ${platform}`)
  }

  const handleDelete = (platform: string) => {
    console.log(`Delete ${platform}`)
  }
  return (
    
      <li className={`${rubikFont.className} `}>
        <div className="flex gap-2 items-center align-middle">
          {<Icon className="text-indigo-500" size={32} />}
          <p>{data}</p>
        </div>

        <div className="flex justify-end gap-4">
          <FaEdit size={20} onClick={() => handleEdit(platform)} />
          <FaTrash size={20} onClick={() => handleDelete(platform)} />
        </div>
      </li>
  )
}

export default ClientCollapseDetails
