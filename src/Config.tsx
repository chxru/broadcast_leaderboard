import { bc } from "./broadcast";

const App = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    bc.postMessage({
      schoolName: evt.currentTarget?.schoolName?.value || "",
      schoolScore: evt.currentTarget?.schoolScore?.value || "",
    });
  };

  return (
    <div>
      <div>Config Page</div>

      <form onSubmit={handleSubmit}>
        {/* form for school name and score  */}
        <label htmlFor="schoolName">School Name</label>
        <input type="text" id="schoolName" name="schoolName" />

        <label htmlFor="schoolScore">Score</label>
        <input type="text" id="schoolScore" name="schoolScore" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
