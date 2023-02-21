import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../hooks';

import Dropdown from 'react-bootstrap/Dropdown';

import './Navbar.css'



export const Navbar = () => {

  let navigate = useNavigate();

  const { startLogout, verifyUserStatus, statusLogin } = useAuthStore();
  const [verifyUser, setVerifyUser] = useState()

  const statusActLogin = statusLogin()

  useEffect(  () => {
    verifyUserStatus().then( status => {
      setVerifyUser(status)
    } )
    
  }, [])



  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fa-solid fa-shield-cat" ></i>
            &nbsp;
            <a 
              href="/*"
            >Papushquita</a>                        
        </span>
        <div className="btn-group" role="group" aria-label="Basic example">
          <Dropdown>
            <Dropdown.Toggle 
              variant="outline-primary" 
              id="dropdown-basic" 
              className="btn btn-outline-primary"
              style={{ display: statusActLogin !== 'not-authenticated' ? 'block' : 'none'}}

            ><i className="fa-solid fa-dog"></i>Mascotas
            </Dropdown.Toggle>
            <Dropdown.Menu>

              <Dropdown.Item 
                onClick={ () => { navigate("/pets") }}
              >Agregar mascota
              </Dropdown.Item>

              <Dropdown.Item 
                onClick={ () => { navigate("/pets/myPets") }}
              >Mis mascotas
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          &nbsp;
          <Dropdown>
            <Dropdown.Toggle 
                variant="outline-primary" 
                id="dropdown-basic" 
                className="btn btn-outline-primary"
                style={{ display: statusActLogin !== 'not-authenticated' ? 'block' : 'none'}}
              ><i className="fa-solid fa-cat"></i>Solicitudes
            </Dropdown.Toggle>
            <Dropdown.Menu>

              <Dropdown.Item 
                onClick={ () => { navigate("/solicitude") }}
              >Recibidas
              </Dropdown.Item>

              <Dropdown.Item 
                onClick={ () => { navigate("/solicitude/sent") }}
              >Enviadas
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          &nbsp;
          <div>
            <button 
              className="btn btn-outline-primary" 
              onClick={ () => { navigate("/auth/userVerify") }}
              style={{ display: verifyUser === false && statusActLogin !== 'not-authenticated' ? 'block' : 'none'}}
              >
                <i className="fa-solid fa-user"></i>
                &nbsp;
                <span> Verificar usuario</span>
            </button>
          </div>
          <div>
            <button 
              className="btn btn-outline-primary" 
              onClick={ () => { navigate("/auth/viewUser") }}
              style={{ display: verifyUser === true && statusActLogin !== 'not-authenticated' ? 'block' : 'none'}}
              >
                <i className="fa-solid fa-user"></i>
                &nbsp;
                <span> Editar usuario</span>
            </button>
          </div>
          &nbsp;
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
        
        
        
        
    </div>
  )
}
