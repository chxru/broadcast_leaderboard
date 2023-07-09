import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
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
    <Box>
      <Flex direction={"row"} h={"100vh"}>
        <Flex w={"40%"} justify={"center"} align={"center"} bg={"black"}>
          <Image src={"./xbotix.png"} alt={"logo"} />
        </Flex>

        <Box w={"60%"}>
          <Box p={8}>
            {data
              .sort((a, b) => b.score - a.score)
              .map(({ name, score, time }, i) => (
                <Card key={name} mb={4} w={"full"}>
                  <CardHeader>
                    <Flex justifyContent={"space-between"}>
                      <Text fontSize={"2xl"}>
                        {i + 1}. {name}
                      </Text>
                      <Text fontSize={"2xl"}>{score} pts.</Text>
                    </Flex>
                  </CardHeader>

                  <CardBody mt={0} pt={0}>
                    <Flex justifyContent={"end"}>
                      <Text>{time}</Text>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
