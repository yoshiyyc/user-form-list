import { Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import List from "./pages/List";

function App() {
  return (
    <div className="App container py-5">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
