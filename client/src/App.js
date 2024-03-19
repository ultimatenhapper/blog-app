import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AddBlog from "./pages/add-blog/AddBlog";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-blog" element={<AddBlog />} />
      </Routes>
    </div>
  );
}

export default App;
