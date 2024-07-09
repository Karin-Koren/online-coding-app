import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";

import Lobby from "./Screens/Lobby";
import CodeBlock from "./components/CodeBlock";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/codeblock/:id" element={<CodeBlock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
