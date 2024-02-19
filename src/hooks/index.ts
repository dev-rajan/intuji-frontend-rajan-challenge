import { database } from "@src/context/Firebase";

import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetData = (key: string) => {
  const [data, setData] = useState<Array<DocumentData>>([]);
  const [dataSize, setDataSize] = useState<number>(0);

  const getData = async () => {
    const q = query(collection(database, key));

    const querySnapshot = await getDocs(q);
    setDataSize(querySnapshot.size);

    const teamsData: Array<DocumentData> = [];
    querySnapshot.forEach((doc) => {
      teamsData.push({ id: doc.id, ...doc.data() } as DocumentData);
    });
    setData(teamsData);
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, dataSize };
};
