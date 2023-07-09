import { useEffect, useRef, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Message } from "./types";
import { onValue, ref } from "firebase/database";
import { firebase_database } from "./firebase";

const dbRef = ref(firebase_database, "school");

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
          <Image src={"./assets/web.png"} alt={"logo"} />
        </Flex>

        <Box w={"60%"}>
          <Box p={8}>
            <div id="leaderboard">
              {Array.isArray(data) && <div className="ribbon"></div>}
              <table>
                <tbody>
                  {Array.isArray(data) &&
                    data
                      .sort((a, b) => b.score - a.score)
                      .map(({ name, score, time }, i) => (
                        <tr key={name}>
                          <td className="points">
                            {i == 0 ? (
                              <img
                                className="gold-medal"
                                src="./assets/gold-medal.png"
                              />
                            ) : i == 1 ? (
                              <img
                                className="gold-medal"
                                src="./assets/silver-medal.png"
                              />
                            ) : i == 2 ? (
                              <img
                                className="gold-medal"
                                src="./assets/bronze-medal.png"
                              />
                            ) : null}
                            <Text>{score}</Text>
                          </td>
                          <td>
                            <Text>{name}</Text>
                          </td>
                          <td>
                            <Text>{time}</Text>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
