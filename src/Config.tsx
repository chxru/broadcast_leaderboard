/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ain't dealing with ts bs rn
import { Button, Container, HStack, Input, Text } from "@chakra-ui/react";
import { bc } from "./broadcast";
import { Message, NUMBER_OF_TEAMS } from "./types";
import { useEffect, useRef } from "react";

const App = () => {
  const initialized = useRef(false);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: Message = [];
    for (let i = 0; i < NUMBER_OF_TEAMS; i++) {
      const name = (evt.target as any)[`name_${i + 1}`].value;
      const score = parseInt((evt.target as any)[`score_${i + 1}`].value);

      console.log(name, score);

      if (!name || !score) continue;

      data.push({ name, score });

      localStorage.setItem("data", JSON.stringify(data));
    }

    console.log(data);

    bc.postMessage(data);
  };

  useEffect(() => {
    if (!initialized.current) {
      const data = localStorage.getItem("data");
      if (data) {
        const parsedData = JSON.parse(data);
        console.log(parsedData);

        // check if data is valid
        if (Array.isArray(parsedData)) {
          // set data
          for (let i = 0; i < parsedData.length; i++) {
            const nameInput = document.getElementById(
              `name_${i + 1}`
            ) as HTMLInputElement;
            const scoreInput = document.getElementById(
              `score_${i + 1}`
            ) as HTMLInputElement;

            if (!nameInput || !scoreInput) {
              console.warn("Input not found", i);
              continue;
            }

            console.log(nameInput, scoreInput);

            nameInput.value = parsedData[i].name;
            scoreInput.value = parsedData[i].score;
          }

          bc.postMessage(parsedData);
        }
      }

      initialized.current = true;
    }
  }, []);

  return (
    <Container>
      <Text fontSize={"2xl"}>Configuration Dashboard</Text>

      <form onSubmit={handleSubmit}>
        <HStack mt={2} mb={4}>
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>

          <Button>Clear Storage</Button>
        </HStack>

        {Array.from({ length: NUMBER_OF_TEAMS }).map((_, i) => (
          <HStack key={i} padding={"2"}>
            <Text>{i + 1}.</Text>
            <Input
              id={`name_${i + 1}`}
              name={`name_${i + 1}`}
              placeholder="Institute Name"
              w={"75%"}
            />
            <Input
              id={`score_${i + 1}`}
              name={`score_${i + 1}`}
              placeholder="Score"
              w={"25%"}
            />
          </HStack>
        ))}
      </form>
    </Container>
  );
};

export default App;
