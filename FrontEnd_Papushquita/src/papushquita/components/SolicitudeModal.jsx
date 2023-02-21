
import Modal from 'react-modal';
import 'sweetalert2/dist/sweetalert2.min.css'

import {  useState } from 'react';
import { useSolicitudeStore } from '../../hooks';

import Swal from 'sweetalert2';



const customStyles = {
    content: {
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '250px'
    },
  };

  Modal.setAppElement('#root');

export const SolicitudeModal = ({modalIsOpen, setIsOpen, pet}) => {

    const { sendSolicitude } = useSolicitudeStore()
    const [modalCancel, setModalCancel] = useState(true)



    const closeModal = () => {
        setIsOpen(false);
    }

    const [formValues, setFormValues] = useState({
        message: '',
    });

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    }


    const onSubmit = async() => {
        if(modalCancel){ return }
        sendSolicitude({ ...formValues, ...pet })
            .then(response => {
                if( !response.data.ok ){
                    Swal.fire('Error al enviar la solicitud', response.data.msg, 'error');
                }
                console.log(response.data.msg)
            })
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
                <label>Hola! estoy interesado en adoptar a esta mascota!</label>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="deja un mensaje breve de porque quiere esta mascota(opcional)"
                    rows="5"
                    name="message"
                    value={ formValues.message }
                    onChange={onInputChanged}
                ></textarea>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
                onClick={ () => { closeModal(); setModalCancel(false); } }
            >
                <i className="far fa-save"></i>
                <span> Enviar </span>
            </button>
            &nbsp;
            <button
                onClick={ () => { closeModal(); setModalCancel(true); } }
                className="btn btn-outline-danger btn-block"
            >
                <i className="far fa-stop-circle"></i>
                <span> Cancelar</span>
            </button>


        </form>

    </Modal>
  )
}

