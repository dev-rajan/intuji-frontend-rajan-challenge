import { Button, Typography } from "antd";
import { getDatabase, ref, set } from "firebase/database";
import React from "react";

import { app } from "./firebase";

const { Title } = Typography;

const db = getDatabase(app);

const App: React.FC = () => {
  const putData = () => {
    set(ref(db, "users/"), {
      id: 1,
      name: "Rajan",
      age: 30,
    });
  };
  return (
    <>
      <Title>User Management</Title>
      <Button onClick={putData} type="primary">
        Test Firebase Connect
      </Button>
    </>
  );
};

export default App;
