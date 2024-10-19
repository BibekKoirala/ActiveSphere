"use client";
import { Games } from "@/Data";
import React, { useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase/FirebaseConfig";
import { useSession } from "next-auth/react";
import FullScreenLoader from "@/components/FullScreenLoader";
import { addDoc, collection, doc, documentId, getFirestore, setDoc } from "firebase/firestore";
import { Snackbar } from "@/components/SnackBar";

const storage = getStorage(app);
const db = getFirestore(app);


interface FormData {
  title: string;
  description: string;
  sport: string;
  location: string;
  zipcode: string;
  image: File | null; // The image can be a File or null
  date: string; // Date as a string, usually in 'YYYY-MM-DD' format
}

export default function Post() {
  const session = useSession();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    sport: "",
    location: "",
    zipcode: "",
    image: null,
    date: "", // Add date field to the state
  });

  const [progress, setProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({ isVisible: false, message: '', success: false });
  const [loading, setLoading] = useState(false);

  function validateZipOrPostalCode(code: string) {
    // Regex for U.S. ZIP code (5 digits or 5 digits + hyphen + 4 digits)
    const usZipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    
    // Regex for Canadian Postal Code (letter-number-letter space number-letter-number)
    const canadaPostalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    
    // Test the input against both patterns
    return usZipCodePattern.test(code) || canadaPostalCodePattern.test(code);
  }

  const validateForm = () => {
    const { title, description, sport, location, zipcode, date } = formData;

    if (!title || !description || !sport || !location || !zipcode || !date) {
      setSnackbar({ isVisible: true, message: "All fields are required!", success: false });
      return false;
    }

    if (title.length < 5) {
      setSnackbar({ isVisible: true, message: "Title length should be greater then 4!", success: false });
      return false;
    }

    if (description.length < 10) {
      setSnackbar({ isVisible: true, message: "Description length should be greater then 10!", success: false });
      return false;
    }


    if (!validateZipOrPostalCode(zipcode)) {
      setSnackbar({ isVisible: true, message: "Invalid Zip/Postal Code!", success: false });
      return false;
    }

    if (new Date(date) > new Date()) {
      setSnackbar({ isVisible: true, message: "Date must be in the past!", success: false });
      return false;
    }

    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e?.target?.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.image && session.status === "authenticated" && validateForm() ) {
      setLoading(true);
      const storageRef = ref(storage, formData.image.name);
      // storageRef.name = formData.image.name
      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, 'Posts'), {...formData, image: downloadURL, username: session.data.user?.name, email: session.data.user?.email, profilepic: session.data.user?.image, dateCreated: new Date().toLocaleString()}).then((value)=>{
              setLoading(false)
              setSnackbar({ isVisible: true, message: "Upload Success!", success: true });
              setFormData({
                title: "",
                description: "",
                sport: "",
                location: "",
                zipcode: "",
                image: null,
                date: "",
              })
            })

            console.log("File available at", downloadURL, formData);
          });
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <FullScreenLoader progress={progress} />}
      <Snackbar
      success={snackbar.success}
        message={snackbar.message}
        isVisible={snackbar.isVisible}
        onClose={() => setSnackbar({ isVisible: false, message: '', success: false })}
      />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Post a Sport Event
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sport
            </label>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Sport</option>
              {Games.map((val) => (
                <option key={val.id} value={val.name}>
                  {val.name}
                </option>
              ))}
              
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
