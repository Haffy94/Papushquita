import { useEffect, useState } from 'react';
import { usePetStore } from '../../hooks';

import image from '../images/kilu.jpg'
import './PapushquitaPage.css'


export const PapushquitaPage = () => {
  const { viewPets } = usePetStore();
  const pets = viewPets();

  const [first, setfirst] = useState([])

  useEffect(() => {
    pets.then(res => {
      setfirst(res.data.mascota);
      console.log(res.data.mascota)
    }).catch(err => {
        console.log(err)
    })
    
  }, [first.length])

    return (
      <div className="container m-t-md">
        <div className="row" >
          { first.map((pet, index ) => 
                <div className="col-xs-12 col-md-4" key={index} >
                  {/* <!-- Card --> */}
                  <article className="card animated fadeInLeft" >
                    {/* <img className="card-img-top img-responsive" src="https://snap-photos.s3.amazonaws.com/img-thumbs/960w/1U2EGZ07GU.jpg" alt="Deer in nature" /> */}
                    <img className="card-img-top" src={ `http://localhost:4000/${pet?.image}`} alt="Card image cap" width="180" height="382" />
                    <div className="card-block">
                      <h4 className="card-title">{ pet?.name }</h4>
                      <h6 className="text-muted">{ pet?.age }</h6>
                      <h6 className="text-muted">{ pet?.breed + ' ' + pet?.gender + ' ' +  pet?.size }</h6>
                      <p className="card-text">{ pet?.notes }</p>
                      <h6 className="text-muted">{ pet?.address }</h6>
                      <a href="#" className="btn btn-primary"  style={{ margin:"5px" }} >Adoptar</a>
                    </div>
                  </article> {/* <!-- .end Card --> */}

                </div>
                
              
          
            
            )
          }
        </div>
      </div>

    )
}
