import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { rubikFont } from "@/types/font"; // Adjust the import path as needed

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  copy: boolean;
  setCopy: (value: boolean) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  url,
  copy,
  setCopy,
}) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopy(true);
  };

  useEffect(() => {
    setCopy(false);
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center">
      <div
        className={`${rubikFont.className} rounded-lg bg-green-500 p-6 shadow-lg`}
      >
        <h2 className="mb-4 text-2xl font-black text-gray-800">
          הלקוח הוקם בהצלחה ! 😊
        </h2>
        <p className="mb-4 text-gray-100">{url}</p>
        <div className="flex flex-row gap-2">
          <button
            onClick={handleCopy}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700"
          >
            {copy ? "הקישור הועתק" : "העתק קישור"}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-gray-700"
          >
            סגור
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomModal;
