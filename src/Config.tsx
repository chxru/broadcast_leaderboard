/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ain't dealing with ts bs rn
import { Button, Container, HStack, Input, Text } from "@chakra-ui/react";
import { bc } from "./broadcast";
import { Message, NUMBER_OF_TEAMS } from "./types";

const App = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: Message = [];
    for (let i = 0; i < NUMBER_OF_TEAMS; i++) {
      const name = (evt.target as any)[`name_${i + 1}`].value;
      const score = parseInt((evt.target as any)[`score_${i + 1}`].value);

      console.log(name, score);

      if (!name || !score) continue;

      data.push({ name, score });
    }

    console.log(data);

    bc.postMessage(data);
  };

  return (
    <Container>
      <Text fontSize={"2xl"}>Configuration Dashboard</Text>

      <form onSubmit={handleSubmit}>
        <Button type="submit" colorScheme="teal" mt={2} mb={4}>
          Submit
        </Button>

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
