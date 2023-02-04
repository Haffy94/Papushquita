
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import { useState } from 'react';
import { useAuthStore, useUiStore } from '../../hooks';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');


export const ChangePasswordModal = ({modalIsOpen, setIsOpen}) => {

    
    const { startChangePassword } = useAuthStore()



    const closeModal = () => {
    setIsOpen(false);
    }

    const [formValues, setFormValues] = useState({
        password: '',
        password2: ''
    });

    const onImputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    }


    const onSubmit = async( event ) => {
        event.preventDefault();
        if ( formValues.password  !== formValues.password2 ){
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;

        }else{
            if( formValues.password  == '' ){
                Swal.fire('Error en registro', 'Contraseña no debe estar vacia', 'error');
                return;
            }
            if( !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(formValues.password )) ){
                Swal.fire('Error en registro', 'Contraseña debe tener al menos una Mayuscula, una minuscula, un numero y ser mayor a 6 digitos', 'error');
                return;
            }
            startChangePassword({
                password: formValues.password,
            }).then( res => {
                Swal.fire('Contraseña modificada!', '', 'success')
                .then((result) => {
                    window.location.replace('http://localhost:5173/'); 
                });         
            })

        }
    }

  return (
    <Modal
        isOpen = { modalIsOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Nueva Contraseña</label>
                <input 
                    type="password" 
                    className={`form-control`}
                    placeholder=""
                    name="password"
                    autoComplete="off"
                    value={ formValues.password }
                    onChange={onImputChanged}
                />
            </div>
            <div className="form-group mb-2">
                <label>Repita Contraseña</label>
                <input 
                    type="password" 
                    className={`form-control`}
                    placeholder=""
                    name="password2"
                    autoComplete="off"
                    value={ formValues.password2 }
                    onChange={onImputChanged}
                />
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

            <button
                data-dismiss="modal"
                onClick={ () => { closeModal() } }
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-close"></i>
                <span> cancelar</span>
            </button>
            

        </form>

    </Modal>
  )
}
