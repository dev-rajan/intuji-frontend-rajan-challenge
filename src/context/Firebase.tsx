import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { createContext, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

interface IFirebaseContext {
  key: string;
  data: {
    [key: string]: string;
  };
}

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

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext({});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: Props) => {
  const putData = ({ key, data }: IFirebaseContext) => {
    set(ref(database, key), data);
  };
  return (
    <FirebaseContext.Provider value={{ putData }}>
      {children}
    </FirebaseContext.Provider>
  );
};
