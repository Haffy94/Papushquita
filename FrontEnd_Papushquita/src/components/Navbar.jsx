import { useNavigate } from 'react-router-dom'



export const Navbar = () => {

  let navigate = useNavigate();


  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fa-solid fa-shield-cat" ></i>
            &nbsp;
            Papushquita
        </span>
        <button 
          className="btn btn-outline-primary" 
          onClick={ () => { navigate("/auth") }}
          >
            <i className="fas fa-sign-in-alt" ></i>
            <span> Login/Register</span>
        </button>      
    </div>
  )
}
