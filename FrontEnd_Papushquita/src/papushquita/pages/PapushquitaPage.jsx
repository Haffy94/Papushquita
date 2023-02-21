import { useEffect, useState } from 'react';
import { useAuthStore, usePetStore } from '../../hooks';
import Swal from 'sweetalert2';
import { SolicitudeModal } from '../components/SolicitudeModal'


export const PapushquitaPage = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState()
  const { viewPets } = usePetStore();
  const {  statusLogin, verifyUserStatus, errorMessage } = useAuthStore();
  const pets = viewPets();

  const [first, setfirst] = useState([])
  const [verifyUser, setVerifyUser] = useState()

  const statusActLogin = statusLogin()

  useEffect(() => {
    pets.then(res => {
      setfirst(res.data.mascota);
    }).catch(err => {
        console.log(err)
    })
    
  }, [first.length])


  useEffect(  () => {
    verifyUserStatus().then( status => {
      setVerifyUser(status)
    } )
    
  }, [])

  

  return (
    <>
      <div className="container m-t-md">
        <div className="row" >
          { first.map((pet, index ) => 
            <div className="col-xs-12 col-md-3" key={index} >
              <article className="card animated fadeInLeft" >
                <img className="card-img-top" src={ `http://localhost:4000/${pet?.image}`} alt="Card image cap" width="180" height="382" />
                <div className="card-block">
                  <h4 className="card-title">{ pet?.name }</h4>
                  <h6 className="text-muted">Edad: { pet?.age }</h6>
                  <h6 className="text-muted">{ pet?.breed + ' ' + pet?.gender + ' ' +  pet?.size }</h6>
                  <p className="card-text">{ pet?.notes }</p>
                  <h6 className="text-muted">{ pet?.address }</h6>
                  <a 
                    href="#" 
                    className="btn btn-primary"  
                    style={{ margin:"5px" }} 
                    onClick={ () => 
                      { 
                        
                        if(statusActLogin === 'not-authenticated'){
                          Swal.fire('Debe estar Logeado para poder adoptar', '', 'error');
                        }else if( !verifyUser ){
                          Swal.fire('Debe Verificar su usuario para poder adoptar', '', 'error');
                        }else{
                          setSelectedPet(pet)
                          setIsOpen(true)
                        }
                      }
                    }
                  >Adoptar</a>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
      <SolicitudeModal setIsOpen={ setIsOpen } modalIsOpen={ modalIsOpen } pet={selectedPet}/>
    </>
  )
}
