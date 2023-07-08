import { useEffect, useRef } from "react";
import { bc } from "./broadcast";

const App = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      bc.onmessage = (evt) => {
        console.log(evt.data);
      };

      bc.onmessageerror = (evt) => {
        console.log(evt);
      };

      initialized.current = true;
    }
  }, []);

  return <div>Main Page</div>;
};

export default App;
