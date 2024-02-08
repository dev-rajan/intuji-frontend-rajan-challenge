import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCooT0TAGeFiYXdn6Hws88msHDSoSeSYDg",
  authDomain: "intuji-frontend-challeng-95d24.firebaseapp.com",
  projectId: "intuji-frontend-challeng-95d24",
  storageBucket: "intuji-frontend-challeng-95d24.appspot.com",
  messagingSenderId: "992518152359",
  appId: "1:992518152359:web:323dfd9c1a600a2a22bb82",
  measurementId: "G-SDTXD3E405",
  databaseURL:
    "https://intuji-frontend-challeng-95d24-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
