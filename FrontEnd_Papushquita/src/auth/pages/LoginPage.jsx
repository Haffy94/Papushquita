import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './loginPage.css';

const loginFormFields = {
    loginEmail:     '',
    loginPassword:  '',
}

const registerFormFields = {
    registerName:      '',
    registerEmail:      '',
    registerPassword:   '',
    registerPassword2:  '',
}

export const LoginPage = () => {


    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );


    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
        Swal.fire('Bienvenido', '', 'success')
        .then((result) => {
            window.location.replace('http://localhost:5173/');
          });     
    }

    const registerSubmit =  ( event ) => {
        event.preventDefault();
        
        if( registerName == '' ){
            Swal.fire('Error en registro', 'El Nombre de Usuario es obligatorio', 'error');
            return;
        }
        if( !(/([a-zA-Z0-9]{6,})/.test(registerName)) ){
            Swal.fire('Error en registro', 'El Nombre de Usuario debe tener al menos 6 caracteres', 'error');
            return;
        }
        if( registerEmail == '' ){
            Swal.fire('Error en registro', 'El mail es obligatorio', 'error');
            return;
        }
        if( !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerEmail)) ){
            Swal.fire('Error en registro', 'Formato de email invalido', 'error');
            return;
        }
        if( registerPassword == '' ){
            Swal.fire('Error en registro', 'Contraseña no debe estar vacia', 'error');
            return;
        }
        if( !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(registerPassword)) ){
            Swal.fire('Error en registro', 'Contraseña debe tener al menos una Mayuscula, una minuscula, un numero y ser mayor a 6 digitos', 'error');
            return;
        }
        if ( registerPassword !== registerPassword2 ){
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
        Swal.fire('Usuario creado Exitosamente!', 'Por favor ingrese su mail y su contraseña', 'success')
            .then((result) => {
                location.reload();
              });
        
        
    }

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        console.log(errorMessage)
        //Swal.fire('Error de autenticacion!!', errorMessage, 'error');
      }
    

    }, [errorMessage])
    



    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form 
                        id='registerForm'
                        onSubmit={ registerSubmit }
                    >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta"
                                />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}