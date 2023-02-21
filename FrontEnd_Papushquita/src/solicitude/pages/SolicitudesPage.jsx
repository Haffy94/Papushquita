import { useEffect, useState } from 'react';
import { useSolicitudeStore, usePetStore } from '../../hooks';
import { ViewProfileModal } from '../components/ViewProfileModal';


export const SolicitudesPage = () => {

  const { viewSolicitude, modifySolicitude, modifyOtherSolicitude } = useSolicitudeStore();
  const { startAdoptPet } = usePetStore();

  const solicitude = viewSolicitude();

  const [selectedSolicitude, setSelectedSolicitude] = useState(null)
  
  const [modalIsOpen, setIsOpen] = useState(false);

  const [first, setfirst] = useState([])

  useEffect(() => {
    solicitude.then(res => {
      setfirst(res.data.solicitud);
    }).catch(err => {
        console.log(err)
    })
    
  }, [first.length])







  return (
    <>
      <div className="container m-t-md">
        <div className="row" >
          { first.map((solicitud, index ) => 
                <div className="col-xs-12 col-md-3" key={index} >
                  {/* <!-- Card --> */}
                  <article className="card animated fadeInLeft" id={ `articulo-${index}`} >
                    <img className="card-img-top" src={ `http://localhost:4000/${solicitud?.image}`} alt="Card image cap" width="180" height="382" />
                    <div className="card-block">
                      <h4 className="card-title">{ solicitud?.petName }</h4>
                      <h6 className="text-muted">Usuario: { solicitud?.userName }</h6>
                      <h6 className="text-muted">Fecha: { solicitud?.date.toString().slice(0, 10) }</h6>
                      <h6 className="text-muted">Mensaje: { solicitud?.message }</h6>
                      <h6 className="text-muted">Estado: { solicitud?.status }</h6>
                      
                      <button 
                          onClick={ () => 
                                    { 
                                      setSelectedSolicitude(solicitud)
                                      console.log(selectedSolicitude)
                                      setIsOpen(true)
                                    }
                                  } 
                          className="btn btn-primary"  
                          style={{ margin:"5px", display: solicitud.status !== ('Retirado!' ) ? 'block' : 'none' }}
                        >Ver</button>

                        <button 
                          onClick={ () => 
                                    {                                      
                                      startAdoptPet( solicitud?.pet)
                                      modifyOtherSolicitude(solicitud?.pet, solicitud?.id)                                     
                                      window.location.reload();
                                      
                                    }
                                  } 
                          className="btn btn-primary"  
                          style={{ margin:"5px", display: solicitud.status === 'Aprobado' ? 'block' : 'none' }} //style={{ margin:"5px" }} 
                        >Retiro mascota</button>

                        <button 
                          onClick={ () => 
                                    { 
                                      let element = document.getElementById(`articulo-${index}`);
                                      element.remove();
                                      modifySolicitude(solicitud?.id, 'Rechazado')
                                    }
                                  } 
                          className="btn btn-danger"  
                          style={{ margin:"5px", display: solicitud.status === 'Pendiente' ? 'block' : 'none' }}
                        >Rechazar</button>

                        <button 
                          onClick={ () => 
                                    { 
                                      let element = document.getElementById(`articulo-${index}`);
                                      element.remove();
                                      modifySolicitude(solicitud?.id, 'Rechazado')
                                    }
                                  } 
                          className="btn btn-danger"  
                          style={{ margin:"5px", display: solicitud.status === 'Aprobado' ? 'block' : 'none' }}
                        >No retiro mascota</button>
                    </div>
                  </article> {/* <!-- .end Card --> */}

                </div>
                
              
          
            
            )
          }
        </div>
      </div>
      <ViewProfileModal setIsOpen={ setIsOpen } modalIsOpen={ modalIsOpen } selectedSolicitude={selectedSolicitude}/>
    </>
    

  )
}
