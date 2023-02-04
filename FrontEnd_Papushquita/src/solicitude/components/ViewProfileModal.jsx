import Modal from 'react-modal';

import 'sweetalert2/dist/sweetalert2.min.css'

import { useEffect, useState } from 'react';
import { useAuthStore, useSolicitudeStore} from '../../hooks';



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

export const ViewProfileModal = ({modalIsOpen, setIsOpen}) => {



    const { startShowUser } = useAuthStore()
    const user = startShowUser()
    
    const [userMod, setUserMod] = useState([])

    useEffect(() => {
        user.then(res => {
            setUserMod(res.data.usuario);
        }).catch(err => {
            console.log(err)
        })
        
        }, [userMod.length])
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
        <div className="container m-t-md">
            <div className="row" >
                <div className="col-xs-12 col-md-12" >
                    {/* <!-- Card --> */}
                    <article className="card animated fadeInLeft" >
                    <div className="card-block">
                        <h4 className="card-title">Datos del Usuario</h4>
                        <h6 className="text-muted">Nombre:          { userMod?.name }</h6>
                        <h6 className="text-muted">Email:           { userMod?.email }</h6>
                        <h6 className="text-muted">Nombre Completo:  { userMod?.fullName }</h6>
                        <h6 className="text-muted">Telefono: { userMod?.contactPhone }</h6>
                        <h6 className="text-muted">Tipo y Numero de documento: { userMod?.documentType } { userMod?.documentId }</h6>
                        <h6 className="text-muted">Direccion: { userMod?.address }</h6>
                        <h6 className="text-muted">Tipo de hogar: { userMod?.houseType }-{ userMod?.houseType2 }</h6>
                        <h6 className="text-muted">Experiencia con Mascotas: { userMod?.experienceWhitOtherPets }</h6>
                        <h6 className="text-muted">Mascotas castradas: { userMod?.otherAnimalsCastration }</h6>
                        <h6 className="text-muted">Proteccion de ventana: { userMod?.windowsProtect }</h6>
                        <button 
                        onClick={ () => 
                                    { 
                                    navigate("/auth/editUser", {
                                        state: userMod
                                    } )
                                    }
                                } 
                        className="btn btn-primary"  
                        style={{ margin:"5px" }} 
                        >Aprobar Solicitud</button>
                    </div>
                    </article> {/* <!-- .end Card --> */}

                </div>
            </div>
        </div>
    </Modal>
  )
}

