import { config } from 'dotenv';
import { setLogLevel } from "firebase/firestore";
// setLogLevel('debug');

// Import Firebase modules using ES Module syntax
import { initializeApp } from "firebase/app";
import { getFirestore, doc, addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";
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

// Function to add medication data with auto-generated document ID
async function createMedicationData() {
    try {
        const medicationData = {
            dosage: "500mg twice a day", // String
            medication_id: "Tablet123",             // String
            user_id: "3DpQHfZDkoDvfluONo3N", // String
            name: "Sample Tablet", // String
            refillAlertThreshold: 5, // Integer
            remainingcount: 10, // Integer
            schedule: [ 
                { "hour": 9, "minute": 0 },
                { "hour": 21, "minute": 0 }
              ],                                // Array of Dictionary
            prescriptionEndData: "2025-03-01T00:00:00.000Z",    // Timestamp
            created_at: Timestamp.now(),  // Set when the document is created
            updated_at: Timestamp.now()   // Set when the document is updated
        };

        // Add a new document with a generated ID
        const docRef = await addDoc(collection(db, 'medications'), medicationData);
        console.log("Medication data Created successfully with ID:", docRef.id);
    } catch (error) {
        console.error("Error writing Medication data:", error.message);
    }
}

// Function to update medication data
async function updateMedicationData(medicationId, updatedFields) {
    try {
        const medicationRef = doc(db, "medications", medicationId);

        // Ensure updated_at is always updated
        updatedFields.updated_at = Timestamp.now();  

        await updateDoc(medicationRef, updatedFields);
        console.log(`Medication data updated successfully for ID: ${medicationId}`);
    } catch (error) {
        console.error("Error updating Medication data:", error.message);
    }
}

// Call the function to add user data
// createMedicationData();
updateMedicationData("31pberHdd6mAA4GTQ00y", { remainingcount: 8 });