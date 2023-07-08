import { useEffect, useRef, useState } from "react";
import { bc } from "./broadcast";
import { Container, Text } from "@chakra-ui/react";
import { Message } from "./types";

const App = () => {
  const initialized = useRef(false);
  const [data, setData] = useState<Message>([]);

  useEffect(() => {
    if (!initialized.current) {
      bc.onmessage = (evt) => {
        const res = evt.data as Message;
        res.sort((a, b) => b.score - a.score);
        setData(res);
      };

      bc.onmessageerror = (evt) => {
        console.log(evt);
      };

      initialized.current = true;
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
