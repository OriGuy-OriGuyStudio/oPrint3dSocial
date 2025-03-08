"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Client } from "@/types/Client";
import {
  fetchAllDocuments,
  createDocument,
  deleteDocument,
  updateDocument,
  getClientById, // Import the new function
} from "@/service/firebaseService";
import { rubikFont } from "@/types/font";
import { Users } from "lucide-react";
import CustomModal from "@/components/myComp/manageClientsPage/CustonModal";

interface ClientContextProps {
  clients: Client[];
  fetchClients: () => void;
  addClient: (client: Client) => void;
  deleteClient: (clientId: string) => void;
  updateClient: (
    clientId: string,
    fieldtoUpdate: string,
    collection: string,
    newValue: string,
  ) => void;
  getClient: (clientId: string) => Promise<Client | null>; // Add method signature
}
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  copy: boolean;
  setCopy: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientContext = createContext<ClientContextProps | undefined>(undefined);

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [modalUrl, setModalUrl] = useState("");
  const [copy, setCopy] = useState(false);

  const fetchClients = async () => {
    try {
      const data = await fetchAllDocuments("clients");
      setClients(data as Client[]);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    }
  };

  const addClient = async (client: Client) => {
    try {
      const newId = await createDocument("clients", client);
      fetchClients();
      const url = `${window.location.origin}/${newId}`;
      setModalUrl(url);
      setModalOpen(true);
      return newId;
    } catch (error) {
      console.error("Error adding client: ", error);
    }
  };

  const deleteClient = async (clientId: string) => {
    try {
      await deleteDocument("clients", clientId);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client: ", error);
    }
  };

  const updateClient = async (
    clientId: string,
    fieldtoUpdate: string,
    collection: string,
    newValue: string,
  ) => {
    try {
      await updateDocument(collection, clientId, fieldtoUpdate, newValue);
      fetchClients();
    } catch (error) {
      console.error("Error updating client: ", error);
    }
  };

  const getClient = async (clientId: string): Promise<Client | null> => {
    try {
      const client = await getClientById("clients", clientId);
      return client as Client;
    } catch (error) {
      console.error("Error fetching client by ID: ", error);
      return null;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        clients,
        fetchClients,
        addClient,
        deleteClient,
        updateClient,
        getClient,
      }}
    >
      {children}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setCopy(false);
        }}
        url={modalUrl}
        copy={copy}
        setCopy={setCopy}
      />
    </ClientContext.Provider>
  );
};
