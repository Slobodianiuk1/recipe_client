import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Header: FC = () => {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()
  const handleLogout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate('/auth/login')
  }

  return (
    <header className="bg-gray-800 h-14 flex items-center justify-center">
      <nav className="flex gap-10">
        <Link className="text-xl text-white" to='/'>Home</Link>
        <Link className="text-xl text-white" to='/create-recipe'>Create recipe</Link>
        <Link className="text-xl text-white" to='/saved-recipe'>Saved Recipe</Link>
        {
          !cookies.access_token ? (
              <div className="text-xl text-white">
                <Link to={'/auth/login'}>Login</Link>
                &nbsp; | &nbsp;
                <Link to={'/auth/register'}>Register</Link>
              </div>
            )
            : <button onClick={handleLogout} className="text-xl text-white">Logout</button>
        }


      </nav>
    </header>
  );
};

export default Header;