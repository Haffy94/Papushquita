
export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fa-solid fa-shield-cat" ></i>
            &nbsp;
            Papushquita
        </span>
        <span>
        <button 
          className="btn btn-outline-primary" 
          
          style={{ marginRight:"5px" }}>
            <i className="fas fa-sign-in-alt" ></i>
            <span> Login</span>
        </button>

        <button className="btn btn-outline-primary" >
            <i className="fas fa-sign-in-alt" ></i>
            <span> Register</span>
        </button>
        </span>
       
    </div>
  )
}
