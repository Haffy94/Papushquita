import { useViewPets } from '../../hooks';

import image from './kilu.jpg'
import './PapushquitaPage.css'


export const PapushquitaPage = () => {
  const { viewPets } = useViewPets();

  const pets = viewPets();
  console.log(pets)



    return (
        <>
          {/* mascotas en adopcion */}
          {/* mascotitas
          <img class="card-img-top" src={ image } alt="Card image cap" width="180" height="382"/> */}
            <div className="container m-t-md">
            {/* <!-- First row --> */}
              <div className="row">
                <div className="col-xs-12 col-md-4" >
                  {/* <!-- Card --> */}
                  <article className="card animated fadeInLeft" >
                    {/* <img className="card-img-top img-responsive" src="https://snap-photos.s3.amazonaws.com/img-thumbs/960w/1U2EGZ07GU.jpg" alt="Deer in nature" /> */}
                    <img className="card-img-top" src={ image } alt="Card image cap" width="180" height="382" />
                    <div className="card-block">
                      <h4 className="card-title">Kilu</h4>
                      <h6 className="text-muted">adulto</h6>
                      <p className="card-text">muerde mucho si le tocas la panza, recomendamos tener la antitetanica al dia</p>
                      <a href="#" className="btn btn-primary"  style={{ margin:"5px" }} >Adoptar</a>
                    </div>
                  </article> {/* <!-- .end Card --> */}
                </div>
                
              </div> {/* <!-- .end Second row --> */}
          </div>
          
        </>
      )
}
