/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ain't dealing with ts bs rn
import { Button, Container, HStack, Input, Text } from "@chakra-ui/react";
import { Message, NUMBER_OF_TEAMS } from "./types";
import { useEffect, useRef, useState } from "react";
import { firebase_auth, firebase_database } from "./firebase";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { get, ref, set } from "firebase/database";

const dbRef = ref(firebase_database, "university");

const App = () => {
  const initialized = useRef(false);
  const initialDataFetched = useRef(false);
  const [user, setUser] = useState<User | null>(null);

  const signIn = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const email = (evt.target as any).email.value;
    const password = (evt.target as any).password.value;

    if (!email || !password) return;

    signInWithEmailAndPassword(firebase_auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: Message = [];
    for (let i = 0; i < NUMBER_OF_TEAMS; i++) {
      const name = (evt.target as any)[`name_${i + 1}`].value;
      const time = (evt.target as any)[`time_${i + 1}`].value;
      const score = parseInt((evt.target as any)[`score_${i + 1}`].value);

      if (!name || !score) continue;

      data.push({ name, score, time });

      localStorage.setItem("data", JSON.stringify(data));
    }

    console.log(data);

    // bc.postMessage(data);
    set(dbRef, data)
      .then(() => {
        console.log("Data saved");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (!initialized.current) {
      // sign in
      const unsubscribe = onAuthStateChanged(firebase_auth, (user) => {
        setUser(user);
      });

      initialized.current = true;

      return () => {
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    if (user && !initialDataFetched.current) {
      // get data
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val() as Message;
            console.log(data);
            initialDataFetched.current = true;

            // set data for inputs
            for (let i = 0; i < data.length; i++) {
              const name = document.getElementById(
                `name_${i + 1}`
              ) as HTMLInputElement;
              const time = document.getElementById(
                `time_${i + 1}`
              ) as HTMLInputElement;
              const score = document.getElementById(
                `score_${i + 1}`
              ) as HTMLInputElement;

              name.value = data[i].name;
              time.value = data[i].time;
              score.value = data[i].score.toString();
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <Container>
        <Text fontSize={"2xl"} mb={4}>
          Login
        </Text>

        <form onSubmit={signIn}>
          <Input id="email" name="email" placeholder="Email" />
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />

          <Button type="submit" colorScheme="teal" w={"100%"} mt={4}>
            Login
          </Button>
        </form>
      </Container>
    );
  }

  return (
    <Container>
      <Text fontSize={"2xl"}>Configuration Dashboard</Text>

      <form onSubmit={handleSubmit}>
        <HStack mt={2} mb={4}>
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>

          <Button type="reset">Clear Fields</Button>
        </HStack>

        {Array.from({ length: NUMBER_OF_TEAMS }).map((_, i) => (
          <HStack key={i} padding={"2"}>
            <Text>{i + 1}.</Text>
            <Input
              id={`name_${i + 1}`}
              name={`name_${i + 1}`}
              placeholder="Institute Name"
              w={"50%"}
            />
            <Input
              id={`time_${i + 1}`}
              name={`time_${i + 1}`}
              placeholder="Elapsed Time"
              w={"25%"}
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
