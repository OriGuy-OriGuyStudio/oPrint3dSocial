import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Client } from "@/types/Client"
import { rubikFont } from "@/types/font"
import ClientCollapseDetails from "@/components/myComp/ClientCollapseDetails"
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaReact,
  FaTwitter,
} from "react-icons/fa"

interface ClientCollapseProps {
  client: Client[]
}

function ClientCollapse({ client }: ClientCollapseProps) {
  return client.map((client, index) => {
    return (
      <div key={index} className="border-b-2 py-3">
        <Collapsible>
          <CollapsibleTrigger
            className={`${rubikFont.className} text-xl font-bold`}
          >
            {client.name}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-3">
              <ClientCollapseDetails
                Icon={FaFacebook}
                platform="פייסבוק"
                data={client.facebook ?? "אין קישור, ניתן להוסיף"}
              />
              <ClientCollapseDetails
                Icon={FaInstagram}
                platform="אינסטגרם"
                data={client.instagram ?? "אין קישור, ניתן להוסיף"}
              />
              <ClientCollapseDetails
                Icon={FaLinkedin}
                platform="לינקדין"
                data={client.linkedin ?? "אין קישור, ניתן להוסיף"}
              />
              <ClientCollapseDetails
                Icon={FaTiktok}
                platform="טיקטוק"
                data={client.tiktok ?? "אין קישור, ניתן להוסיף"}
              />
              <ClientCollapseDetails
                Icon={FaTwitter}
                platform="אקס"
                data={client.twitter ?? ""}
              />
              <ClientCollapseDetails
                Icon={FaWhatsapp}
                platform="וואטסאפ"
                data={client.whatsapp ?? "אין קישור, ניתן להוסיף"}
              />
              <ClientCollapseDetails
                Icon={FaYoutube}
                platform="יוטיוב"
                data={client.youtube ?? "אין קישור, ניתן להוסיף"}
              />
              <ClientCollapseDetails
                Icon={FaReact}
                platform="אתר"
                data={client.website ?? "אין קישור, ניתן להוסיף"}
              />
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  })
}
export default ClientCollapse
{
  /* <CollapsibleTrigger className={`${rubikFont.className}`}>
{client.name}
</CollapsibleTrigger>
<CollapsibleContent>
<ul>
  <li className={`${rubikFont.className} border-b-2 py-3`}>
    {client.facebook} :Facebook
    <div className="flex gap-2">
      <FaEdit onClick={() => handleEdit("Facebook")} />
      <FaTrash color="red" onClick={() => handleDelete("Facebook")} />
    </div>
  </li>
</ul>
</CollapsibleContent> */
}
