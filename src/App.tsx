import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import SavedRecipes from "./pages/SavedRecipes.tsx";
import Auth from "./pages/Auth.tsx";
import {FC} from "react";

const App: FC = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/saved-recipes" element={<SavedRecipes/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
