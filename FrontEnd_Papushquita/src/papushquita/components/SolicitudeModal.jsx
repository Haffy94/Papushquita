
import Modal from 'react-modal';
import 'sweetalert2/dist/sweetalert2.min.css'

import { useState } from 'react';
import { useSolicitudeStore} from '../../hooks';



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

export const SolicitudeModal = ({modalIsOpen, setIsOpen, pet}) => {

    const { sendSolicitude } = useSolicitudeStore()



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


    const onSubmit = async( event ) => {
        sendSolicitude({ ...formValues, ...pet })
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
            >
                <i className="far fa-save"></i>
                <span> Enviar Solicitud </span>
            </button>

            <button
                data-dismiss="modal"
                onClick={ () => { closeModal() } }
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-close"></i>
                <span> cancelar</span>
            </button>

            <button
                data-dismiss="modal"
                onClick={ console.log(formValues.notes) }
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-close"></i>
                <span> ver info</span>
            </button>
            

        </form>

    </Modal>
  )
}

