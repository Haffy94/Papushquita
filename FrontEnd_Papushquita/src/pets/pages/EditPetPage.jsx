import { useForm, usePetStore } from '../../hooks'
import { useLocation } from "react-router-dom";

import Swal from 'sweetalert2';

import { useState } from "react";





export const EditPetsPage = () => {

    const [pet, setPet] = useState(useLocation().state)


    

    const { addPetImage, startEditPet} = usePetStore();
    const [file, setFile] = useState(null);

    let { name, type, breed, age, gender, size, address, onInputChange, notes } = useForm( pet );

    const petSubmit = ( event ) => {
        event.preventDefault();

        if ( file == null ) { 
            startEditPet(
                {
                id:  pet?.id,
                name: name, 
                type:type, 
                breed:breed, 
                age:age, 
                gender:gender, 
                size:size,
                notes:notes, 
                address:address 
            }
            ).then( res => {
                Swal.fire('Mascota actualizada correctamente', '', 'success')
                    .then((result) => {
                        window.location.replace('http://localhost:5173/pets');
                    }) })}
        else {
            startEditPet({
                petId:  state?.id,
                name: petName, 
                type:petType, 
                breed:petBreed, 
                age:petAge, 
                gender:petGender, 
                size:petSize,
                notes:petNotes, 
                address:petAddress
            }).then( res => {
                console.log(res)
                addPetImage({...res.mascota, 'file':file})
                Swal.fire('Mascota agregada correctamente', '', 'success')
                    .then((result) => {
                window.location.replace('http://localhost:5173/pets');
              });
                
            })
        }
        
    }

    const handleOnChange = e => {
        setFile(e.target.files[0]);
    };


    return (

        <div style={{ margin: "auto", width: "600px" }}>
            <form onSubmit={ petSubmit }>
                <h2>Formulario de Ingreso de Mascota</h2>
                &nbsp;
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="form6Example1" className="form-control" placeholder="name" name="name" value={ name } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="form6Example1">Nombre de la Mascota</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" aria-label="Disabled select example" placeholder="type" name="type" value={ type } onChange = { onInputChange }>
                                <option defaultValue>Selecione una opcion</option>
                                <option value="Gato">Gato</option>
                                <option value="Perro">Perro</option>
                            </select>
                            <label className="form-label" htmlFor="form6Example2">Tipo</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="form6Example1" className="form-control" placeholder="breed" name="breed" value={ breed } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="form6Example1">Raza</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="form6Example1" className="form-control" placeholder="age" name="age" value={ age } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="form6Example1">Edad</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" aria-label="Disabled select example" placeholder="gender" name="gender" value={ gender } onChange = { onInputChange } >
                                <option defaultValue>Sexo</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                            <label className="form-label" htmlFor="form6Example2">Sexo</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" aria-label="Disabled select example" placeholder="size" name="size" value={ size } onChange = { onInputChange }>
                                <option defaultValue>Tamaño</option>
                                <option value="Chico">Chico</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                                <option value="Muy Grande">Muy Grande</option>
                            </select>
                            <label className="form-label" htmlFor="form6Example2">Tamaño</label>
                        </div>
                    </div>
                </div>


                <div className="form-outline mb-4">
                    <input type="text" id="form6Example3" className="form-control" placeholder="address" name="address" value={ address } onChange = { onInputChange } />
                    <label className="form-label" htmlFor="form6Example3">Direccion</label>
                </div>

                <div>
                    <div>
                        <input type="file" onChange={handleOnChange} />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="form6Example3">Foto de Perfil</label>
                    </div>
                </div>
                &nbsp;

                <div className="form-outline mb-4">
                    <textarea className="form-control" id="form6Example7" rows="4" placeholder="notes" name="notes" value={ notes } onChange = { onInputChange }></textarea>
                    <label className="form-label" htmlFor="form6Example7">Informacion adicional</label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-4" onChange={onInputChange} >Actualizar Mascota!</button>
            </form>
        </div>

    )
}
