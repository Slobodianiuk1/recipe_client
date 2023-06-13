import {FC} from "react";
import {Link} from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="bg-gray-800 h-14 flex items-center justify-center">
      <nav className="flex gap-10">
        <Link className="text-xl text-white" to='/'>Home</Link>
        <Link className="text-xl text-white" to='/create-recipe'>Create recipe</Link>
        <Link className="text-xl text-white" to='/saved-recipe'>Saved Recipe</Link>
        <Link className="text-xl text-white" to='/auth'>Login | Register</Link>
      </nav>
    </header>
  );
};

export default Header;