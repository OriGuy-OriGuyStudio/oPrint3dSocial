import { app, db } from "@/config/firebaseConfig"
import { getApp } from "firebase/app"
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"

// Create a new document
export const createDocument = async (collectionName: string, data: object) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

// Read a document by ID
export const readDocument = async (collection: string, id: string) => {
  try {
    const docRef = doc(db, collection, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      return docSnap.data()
    } else {
      console.log("No such document!")
    }
  } catch (error) {
    console.error("Error getting document: ", error)
  }
}

// Update a specific field in a document
export const updateDocument = async (
  collection: string,
  id: string,
  field: string,
  value: any
) => {
  try {
    const updateData = { [field]: value }
    const docRef = doc(db, collection, id)
    await updateDoc(docRef, updateData)
    console.log("Document successfully updated!")
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}

// Delete a document by ID
export const deleteDocument = async (collection: string, id: string) => {
  try {
    const docRef = doc(db, collection, id)
    await deleteDoc(docRef)
    console.log("Document successfully deleted!")
  } catch (error) {
    console.error("Error deleting document: ", error)
  }
}
