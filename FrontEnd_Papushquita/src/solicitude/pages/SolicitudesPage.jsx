import { useEffect, useState } from 'react';
import { useSolicitudeStore } from '../../hooks';
import { ViewProfileModal } from '../components/ViewProfileModal';


export const SolicitudesPage = () => {

  const { viewSolicitude } = useSolicitudeStore();
  const solicitude = viewSolicitude();
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
                <div className="col-xs-12 col-md-4" key={index} >
                  {/* <!-- Card --> */}
                  <article className="card animated fadeInLeft" >
                    <img className="card-img-top" src={ `http://localhost:4000/${solicitud?.image}`} alt="Card image cap" width="180" height="382" />
                    <div className="card-block">
                      <h4 className="card-title">{ solicitud?.petName }</h4>
                      <h6 className="text-muted">{ solicitud?.userName }</h6>
                      <h6 className="text-muted">{ solicitud?.date }</h6>
                      <h6 className="text-muted">{ solicitud?.message }</h6>
                      <button 
                          onClick={ () => 
                                    { 
                                      setIsOpen(true)
                                    }
                                  } 
                          className="btn btn-primary"  
                          style={{ margin:"5px" }} 
                        >Ver</button>

                        <button 
                          onClick={ () => 
                                    { 
                                      let element = document.getElementById(`articulo-${index}`);
                                      element.remove();
                                    }
                                  } 
                          className="btn btn-danger"  
                          style={{ margin:"5px" }} 
                        >Rechazar</button>
                    </div>
                  </article> {/* <!-- .end Card --> */}

                </div>
                
              
          
            
            )
          }
        </div>
      </div>
      <ViewProfileModal setIsOpen={ setIsOpen } modalIsOpen={ modalIsOpen } />
    </>
    

  )
}
//que nos de un listado que no sea por pet si no por ususario
//con una vista similar a mis pets crear una botonera con las opciones ver, aprobar y denegar