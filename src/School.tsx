import { useEffect, useRef, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Message } from "./types";
import { onValue, ref } from "firebase/database";
import { firebase_database } from "./firebase";

const dbRef = ref(firebase_database, "school");

const App = () => {
  const initialized = useRef(false);
  const [data2, setData2] = useState<Message>([]);

  useEffect(() => {
    if (!initialized.current) {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val() as Message;
        console.log(data);
        setData2(data);
      });
    }

    // setData2(
    //   [
    //     { name: "Team 2", score: 258, time: "2" },
    //     { name: "Team 4", score: 22, time: "3" },
    //     { name: "Team 5", score: 100, time: "5" },
    //     { name: "Team 6", score: 10, time: "4" },
    //     { name: "Team 7", score: 232, time: "3" },
    //     { name: "Team 8", score: 1020, time: "5" },
    //     { name: "Team 9", score: 50, time: "4" },
    //     { name: "Team 10", score: 23, time: "3" },
    //     { name: "Team 11", score: 120, time: "5" },
    //     { name: "Team 12", score: 580, time: "4" },

    //   ]
    // )
  }, []);

  return (
    <Box>
      <Flex direction={"row"} h={"100vh"}>
        <Flex w={"40%"} justify={"center"} align={"center"} bg={"black"}>
          <Image src={"./assets/web.png"} alt={"logo"} />
        </Flex>

        <Box w={"60%"}>
          <Box p={8}>
            {/* <div id="header">
        <h1>LEADERBOARD</h1>


      </div> */}
            <div id="leaderboard">
              <div className="ribbon"></div>
              <table>
                {data2
                  .sort((a, b) => b.score - a.score)
                  .map(({ name, score, time }, i) => (
                    <tr>
                      <td className="number">{i + 1}</td>
                      <td className="name">{name}</td>
                      <td className="points">
                        {score} - {time} m
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
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
