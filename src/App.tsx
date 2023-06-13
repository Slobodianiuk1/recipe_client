import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import SavedRecipes from "./pages/SavedRecipes.tsx";
import Auth from "./pages/Auth.tsx";
import {FC} from "react";
import Header from "./components/Header.tsx";
import CreateRecipe from "./pages/CreateRecipe.tsx";

const App: FC = () => {

  return (
    <div className="bg-gray-300 h-screen">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/saved-recipe" element={<SavedRecipes/>}/>
          <Route path="/create-recipe" element={<CreateRecipe/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
