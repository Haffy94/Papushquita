import React from 'react'
import { useForm, usePetStore } from '../../hooks'

import Swal from 'sweetalert2';

import { useState } from "react";



const petFormFields = {
    petName:       "",
    petType:       "",
    petBreed:      "",
    petAge:        "",
    petGender:     "",
    petSize:       "",
    petNotes:      "",
    petAddress:    ""
}

export const AddPetsPage = () => {

    const { startSavePet, addPetImage} = usePetStore();
    const [file, setFile] = useState(null);

    const { petName, petType, petBreed, petAge, petGender, petSize, petAddress, onInputChange, petNotes } = useForm( petFormFields );

    const petSubmit = ( event ) => {
        event.preventDefault();

        if( petName == '' ){
            Swal.fire('El Nombre de la mascota es obligatorio', '', 'error');
            return;
        }
        if( petBreed == '' ){
            Swal.fire('La raza es Obligatoria', 'en caso de no poseer ninguna indique que es meztizo', 'error');
            return;
        }
        if( petAge == '' ){
            Swal.fire('Indique la edad', 'puede ser en años o meses', 'error');
            return;
        }
        if( petAddress == '' ){
            Swal.fire('Indique la direccion en la que se encuentra la mascota', '', 'error');
            return;
        }
        if( petNotes == '' ){
            Swal.fire('agrege alguna descripcion', 'si la mascota es cariñosa o solitaria por ejemplo', 'error');
            return;
        }


        if ( file == null ) { return Swal.fire( 'La foto de perfil es obligatoria', '', 'error' ); }
        startSavePet({
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
            Swal.fire('Mascota subida correctamente', '', 'success')
                .then((result) => {
            window.location.replace('http://localhost:5173/pets');
          });
            
        })
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
                            <input type="text" id="form6Example1" className="form-control" placeholder="name" name="petName" value={ petName } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="form6Example1">Nombre de la Mascota</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" aria-label="Disabled select example" placeholder="type" name="petType" value={ petType } onChange = { onInputChange }>
                                <option defaultValue>Selecione una opcion</option>
                                <option value="Gato">Gato</option>
                                <option value="Perro">Perro</option>
                            </select>
                            <label className="form-label" htmlFor="form6Example2">Tipo</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="form6Example1" className="form-control" placeholder="breed" name="petBreed" value={ petBreed } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="form6Example1">Raza</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="form6Example1" className="form-control" placeholder="age" name="petAge" value={ petAge } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="form6Example1">Edad</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" aria-label="Disabled select example" placeholder="gender" name="petGender" value={ petGender } onChange = { onInputChange } >
                                <option defaultValue>Sexo</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                            <label className="form-label" htmlFor="form6Example2">Sexo</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" aria-label="Disabled select example" placeholder="size" name="petSize" value={ petSize } onChange = { onInputChange }>
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
                    <input type="text" id="form6Example3" className="form-control" placeholder="address" name="petAddress" value={ petAddress } onChange = { onInputChange } />
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
                    <textarea className="form-control" id="form6Example7" rows="4" placeholder="notes" name="petNotes" value={ petNotes } onChange = { onInputChange }></textarea>
                    <label className="form-label" htmlFor="form6Example7">Informacion adicional</label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-4" onChange={onInputChange} >Poner en Adopcion!</button>
            </form>
        </div>

    )
}
