import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../hooks';

import './Navbar.css'



export const Navbar = () => {

  let navigate = useNavigate();

  const { startLogout, checkAuthToken, statusLogin } = useAuthStore();

  const statusActLogin = statusLogin()



  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fa-solid fa-shield-cat" ></i>
            &nbsp;
            <a 
              href="/*"
            >Papushquita</a>                        
        </span>
        <div>
        <button 
            className="btn btn-outline-primary" 
            onClick={ () => { navigate("/pets") }}
            style={{ display: statusActLogin !== 'not-authenticated' ? 'block' : 'none'}}
            >
              <i className="fa-solid fa-dog"></i>
              &nbsp;
              <span> Agregar Mascota</span>
          </button>
        </div>
        <div>
        <button 
            className="btn btn-outline-primary" 
            onClick={ () => { navigate("/pets/myPets") }}
            style={{ display: statusActLogin !== 'not-authenticated' ? 'block' : 'none'}}
            >
              <i className="fa-solid fa-dog"></i>
              &nbsp;
              <span> Mis Mascotas</span>
          </button>
        </div>
        <div>
          <button 
            className="btn btn-outline-primary" 
            onClick={ () => { navigate("/auth") }}
            style={{ display: statusActLogin === 'not-authenticated' ? 'block' : 'none' }}
            >
              <i className="fas fa-sign-in-alt" ></i>
              &nbsp;
              <span> Login/Register</span>
          </button>
          <button 
            className="btn btn-outline-danger"
            onClick={ startLogout } 
            style={{ display: statusActLogin !== 'not-authenticated' ? 'block' : 'none'}}
          >
              <i className="fas fa-sign-out-alt" ></i>
              &nbsp;
              <span>Salir</span>
          </button>      
        </div>
        
    </div>
  )
}
