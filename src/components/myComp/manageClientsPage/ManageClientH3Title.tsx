import { rubikFont } from "@/types/font";
import React from "react";

interface ManageClientH3TitleProps {
  title: string;
}

function ManageClientH3Title({ title }: ManageClientH3TitleProps) {
  return (
    <h3
      className={`mb-6 text-4xl font-black ${rubikFont.className} text-right text-gray-800`}
    >
      {title}
    </h3>
  );
}

export default ManageClientH3Title;
