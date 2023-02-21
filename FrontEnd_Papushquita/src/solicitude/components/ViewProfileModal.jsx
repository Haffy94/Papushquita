import Modal from 'react-modal';

import 'sweetalert2/dist/sweetalert2.min.css'

import { useEffect, useState } from 'react';
import { useAuthStore, useSolicitudeStore} from '../../hooks';

import { useNavigate } from 'react-router-dom'



const customStyles = {
    content: {
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '380px'
    },
  };

  Modal.setAppElement('#root');

export const ViewProfileModal = ({modalIsOpen, setIsOpen, selectedSolicitude}) => {



    let navigate = useNavigate();

    const { viewUser, sendSolicitude, modifySolicitude } = useSolicitudeStore();
    const [user, setuser] = useState([])
    console.log(selectedSolicitude)
    
    useEffect(() => {
        if(selectedSolicitude !== null){
            viewUser(selectedSolicitude).then(
                res => {
                    setuser(res.data?.usuario)
                }
            ) 

        }
        
        
    
    }, [selectedSolicitude])

    
    

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
        <div className="container m-t-md">
            <div className="row" >
                <div className="col-xs-12 col-md-12" >
                    {/* <!-- Card --> */}
                    <article className="card animated fadeInLeft" >
                    <div className="card-block">
                        <h4 className="card-title">Datos del usuario</h4>
                        <h6 className="text-muted">Nombre de usuario:          { user?.name }</h6>
                        <h6 className="text-muted">Email:           { user?.email }</h6>
                        <h6 className="text-muted">Nombre Completo:  { user?.fullName }</h6>
                        <h6 className="text-muted">Telefono: { user?.contactPhone }</h6>
                        <h6 className="text-muted">Tipo y numero de documento: { user?.documentType } { user?.documentId }</h6>
                        <h6 className="text-muted">Direccion: { user?.address }</h6>
                        <h6 className="text-muted">Tipo de hogar: { user?.houseType }-{ user?.houseType2 }</h6>
                        <h6 className="text-muted">Experiencia con mascotas: { user?.experienceWhitOtherPets }</h6>
                        <h6 className="text-muted">Mascotas castradas: { user?.otherAnimalsCastration }</h6>
                        <h6 className="text-muted">Proteccion de ventana: { user?.windowsProtect }</h6>
                        <button 
                        onClick={ () => 
                                    { 
                                        
                                        
                                        modifySolicitude(selectedSolicitude?.id, 'Aprobado')
                                        window.location.reload();
                                        closeModal()

                                    }
                                } 
                        className="btn btn-primary"  
                        style={{ margin:"5px", display: selectedSolicitude?.status === 'Pendiente' ? 'block' : 'none' }} 
                        >Aprobar solicitud</button>
                    </div>
                    </article> {/* <!-- .end Card --> */}

                </div>
            </div>
        </div>
    </Modal>
  )
}

