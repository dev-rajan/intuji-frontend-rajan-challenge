import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createContext, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

interface IFirebaseContext {
  key: string;
  data: {
    [key: string]: string;
  };
  cb: () => void;
}

const firebaseConfig = {
  apiKey: "AIzaSyCooT0TAGeFiYXdn6Hws88msHDSoSeSYDg",
  authDomain: "intuji-frontend-challeng-95d24.firebaseapp.com",
  projectId: "intuji-frontend-challeng-95d24",
  storageBucket: "intuji-frontend-challeng-95d24.appspot.com",
  messagingSenderId: "992518152359",
  appId: "1:992518152359:web:323dfd9c1a600a2a22bb82",
  measurementId: "G-SDTXD3E405",
  // databaseURL:
  //   "https://intuji-frontend-challeng-95d24-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);

const FirebaseContext = createContext({});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: Props) => {
  const postData = async ({ key, data, cb }: IFirebaseContext) => {
    try {
      await addDoc(collection(database, key), data);
      cb && cb();
    } catch (err) {
      console.log("🚀 ~ postData ~ err:", err);
    }
  };

  return (
    <FirebaseContext.Provider value={{ postData }}>
      {children}
    </FirebaseContext.Provider>
  );
};
