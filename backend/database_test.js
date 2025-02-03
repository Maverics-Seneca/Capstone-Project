import { config } from 'dotenv';
import { setLogLevel } from "firebase/firestore";
// setLogLevel('debug');

// Import Firebase modules using ES Module syntax
import { initializeApp } from "firebase/app";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
config();

// Your Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Function to add user data with auto-generated document ID
async function addUserData() {
    try {
        const userData = {
            medications: ["medication1"], // Array of strings
            partnerCode: "somePartnerCode",             // String
            prescriptionScanUrl: "http://example.com/prescription.jpg" // String
        };

        // Add a new document with a generated ID
        const docRef = await addDoc(collection(db, 'users'), userData);
        console.log("User data written successfully with ID:", docRef.id);
    } catch (error) {
        console.error("Error writing user data:", error.message);
    }
}

// Call the function to add user data
addUserData();