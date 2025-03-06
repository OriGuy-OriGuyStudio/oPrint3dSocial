import { rubikFont } from "@/types/font";
import React from "react";

function ManageClientsTitles() {
  return (
    <div className="mb-4 w-full">
      <h1
        className={`text-right text-6xl font-black text-balance ${rubikFont.className} text-center text-gray-100`}
      >
        ברוכה הבאה לפאנל ניהול הלקוחות{" "}
      </h1>
      <h2
        className={`mt-2 text-right text-xl font-normal text-balance ${rubikFont.className} text-center text-gray-100`}
      >
        פה אתה יכול להוסיף לקוחות, למחוק לקוחות ולעדכן לקוחות
      </h2>
    </div>
  );
}

export default ManageClientsTitles;
