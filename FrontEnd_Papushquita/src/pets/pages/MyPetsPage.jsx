import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetStore, useSolicitudeStore } from '../../hooks';



export const MyPetsPage = () => {

  let navigate = useNavigate();

  const { viewMyPets, deletePet } = usePetStore();
  const pets = viewMyPets();
  const { modifyOtherSolicitude } = useSolicitudeStore();

  const [first, setfirst] = useState([])

  useEffect(() => {
    pets.then(res => {
      setfirst(res.data.mascota);
    }).catch(err => {
        console.log(err)
    })
    
  }, [first.length])

    return (
      <div className="container m-t-md">
        <div className="row" >
          { first.map((pet, index ) => 
                <div className="col-xs-12 col-md-3" key={index}>
                  {/* <!-- Card --> */}
                  <article className="card animated fadeInLeft" id={ `articulo-${index}`} >
                    {/* <img className="card-img-top img-responsive" src="https://snap-photos.s3.amazonaws.com/img-thumbs/960w/1U2EGZ07GU.jpg" alt="Deer in nature" /> */}
                    <img className="card-img-top" src={ `http://localhost:4000/${pet?.image}`} alt="Card image cap" width="180" height="382" />
                    <div className="card-block">
                      <h4 className="card-title">{ pet?.name }</h4>
                      <h6 className="text-muted">{ pet?.age }</h6>
                      <h6 className="text-muted">{ pet?.breed + ' ' + pet?.gender + ' ' +  pet?.size }</h6>
                      <p className="card-text">{ pet?.notes }</p>
                      <h6 className="text-muted">{ pet?.address }</h6>
                      <button 
                        onClick={ () => 
                                  { 
                                    navigate("/pets/editPets", {
                                      state: pet
                                    } )
                                  }
                                } 
                        className="btn btn-primary"  
                        style={{ margin:"5px" }} 
                      >Editar</button>

                      <button 
                        onClick={ () => 
                                  { 
                                    let element = document.getElementById(`articulo-${index}`);
                                    element.remove();
                                    modifyOtherSolicitude(pet?.id, '')
                                    deletePet(pet?.id); 
                                  }
                                } 
                        className="btn btn-danger"  
                        style={{ margin:"5px" }} 
                      >Eliminar</button>
                    </div>
                  </article> {/* <!-- .end Card --> */}

                </div>

            
            )
          }
        </div>
      </div>

    )
}
