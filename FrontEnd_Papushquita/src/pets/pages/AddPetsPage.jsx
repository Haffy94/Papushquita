import React from 'react'
import { useForm, usePetStore } from '../../hooks'

import Swal from 'sweetalert2';

import { useState } from "react";



const petFormFields = {
    petName:       "",
    petType:       "Gato",
    petBreed:      "",
    petAge:        "",
    petGender:     "Macho",
    petSize:       "Chico",
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
                <h2>Formulario de ingreso de mascota</h2>
                &nbsp;
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="petName" className="form-control" placeholder="Nombre" name="petName" value={ petName } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="petName">Nombre</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" id="petType" name="petType" value={ petType } onChange = { onInputChange }>
                                <option defaultValue="Gato">Gato</option>
                                <option value="Perro">Perro</option>
                            </select>
                            <label className="form-label" htmlFor="petType">Tipo</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="petBreed" className="form-control" placeholder="Ej: Mestizo/Salchicha" name="petBreed" value={ petBreed } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="petBreed">Raza</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="petAge" className="form-control" placeholder="Ej: 3 meses/2 años" name="petAge" value={ petAge } onChange = { onInputChange } />
                            <label className="form-label" htmlFor="petAge">Edad</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" id="petGender" name="petGender" value={ petGender } onChange = { onInputChange } >
                                <option defaultValue="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                            <label className="form-label" htmlFor="petGender">Sexo</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select"  id="petSize" name="petSize" value={ petSize } onChange = { onInputChange }>
                                <option defaultValue="Chico">Chico</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                                <option value="Muy Grande">Muy Grande</option>
                            </select>
                            <label className="form-label" htmlFor="petSize">Tamaño</label>
                        </div>
                    </div>
                </div>


                <div className="form-outline mb-4">
                    <input type="text" id="petAddress" className="form-control" placeholder="Barrio o localidad. Por tu seguridad NO pongas dirección exacta." name="petAddress" value={ petAddress } onChange = { onInputChange } />
                    <label className="form-label" htmlFor="petAddress">Localidad</label>
                </div>

                <div>
                    <div>
                        <input type="file" onChange={handleOnChange} />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="fotoTxt">Foto de perfil</label>
                    </div>
                </div>
                &nbsp;

                <div className="form-outline mb-4">
                    <textarea className="form-control" id="petNotes" rows="4" placeholder="Agregue detalles que le gustaría contar sobre esta mascota (Opcional)" name="petNotes" value={ petNotes } onChange = { onInputChange }></textarea>
                    <label className="form-label" htmlFor="petNotes">Información adicional</label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-4" onChange={onInputChange} >Poner en adopción!</button>
            </form>
        </div>

    )
}
