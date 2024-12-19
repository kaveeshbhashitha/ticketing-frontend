import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/web/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
