import { useAuthStore } from '../../hooks'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { ChangePasswordModal } from '../components/ChangePasswordModal'


export const ViewUserPage = () => {

  let navigate = useNavigate();

  const { startShowUser } = useAuthStore()
  const user = startShowUser()

  const [modalIsOpen, setIsOpen] = useState(false);

  const [userMod, setUserMod] = useState([])

  useEffect(() => {
      user.then(res => {
        setUserMod(res.data.usuario);
      }).catch(err => {
          console.log(err)
      })
      
    }, [userMod.length])



  return (
    <>
    <div className="container m-t-md">
      <div className="row" >
              <div className="col-xs-12 col-md-12" >
                {/* <!-- Card --> */}
                <article className="card animated fadeInLeft" >
                  <div className="card-block">
                    <h4 className="card-title">Datos del Usuario</h4>
                    <h6 className="text-muted">Nombre de Usuario:          { userMod?.name }</h6>
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
                    >Modificar Usuario</button>
                    <button 
                      onClick={ () => 
                                { 
                                  setIsOpen(true)
                                }
                              } 
                      className="btn btn-primary"  
                      style={{ margin:"5px" }} 
                    >Modificar Contraseña</button>
                  </div>
                </article> {/* <!-- .end Card --> */}

              </div>
      </div>
    </div>

    <ChangePasswordModal setIsOpen={ setIsOpen } modalIsOpen={ modalIsOpen }/>
    </>
    
  )
}
