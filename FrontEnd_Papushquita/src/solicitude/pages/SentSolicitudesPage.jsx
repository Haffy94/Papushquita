import { useEffect, useState } from 'react';
import { useSolicitudeStore } from '../../hooks';


export const SentSolicitudesPage = () => {
    const { viewSentSolicitude, deleteSolicitude } = useSolicitudeStore();
    const solicitude = viewSentSolicitude();
  
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
                        <h6 className="text-muted">Estado Solicitud: { solicitud?.status }</h6>
                        <h6 className="text-muted">Fecha: { solicitud?.date.toString().slice(0, 10)  }</h6>
                        <h6 className="text-muted">Mensaje: { solicitud?.message }</h6>
                        <h5 
                            className="text-muted"
                            style={{ display: solicitud.status === 'Aprobado' ? 'block' : 'none' }}
                        >Solicitud Aprobada!!!</h5>
                        <h6 
                          className="text-muted"
                          style={{ display: solicitud.status === 'Aprobado' ? 'block' : 'none' }}
                        >El Adoptante se comunicara contigo pronto</h6>
                          <button 
                            onClick={ () => 
                                      {                                        
                                        let element = document.getElementById(`articulo-${index}`);
                                        element.remove();
                                        deleteSolicitude(solicitud.id)
                                      }
                                    } 
                            className="btn btn-danger"  
                            style={{ display: solicitud.status === 'Pendiente' ? 'block' : 'none' }} 
                          >Cancelar</button>
                          <button 
                            onClick={ () => 
                                      {                                        
                                        let element = document.getElementById(`articulo-${index}`);
                                        element.remove();
                                        deleteSolicitude(solicitud.id)
                                      }
                                    } 
                            className="btn btn-danger"  
                            style={{ display: solicitud.status === 'Rechazado' ? 'block' : 'none' }} 
                          >Borrar</button>
                      </div>
                    </article> {/* <!-- .end Card --> */}
  
                  </div>
                  
                
            
              
              )
            }
          </div>
        </div>
      </>
      
  
    )
  }