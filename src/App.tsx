import { useEffect, useRef, useState } from "react";
import { Container, Text } from "@chakra-ui/react";
import { Message } from "./types";
import { onValue, ref } from "firebase/database";
import { firebase_database } from "./firebase";

const dbRef = ref(firebase_database, "university");

const App = () => {
  const initialized = useRef(false);
  const [data, setData] = useState<Message>([]);

  useEffect(() => {
    if (!initialized.current) {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val() as Message;
        console.log(data);
        setData(data);
      });
    }
  }, []);

  return (
    <Container>
      <Text fontSize={"2xl"}>Leaderboard</Text>

      {data.map(({ name, score, time }, i) => (
        <Text key={i}>
          {i + 1}. {name} - {score} - {time}
        </Text>
      ))}
    </Container>
  );
};

export default App;
