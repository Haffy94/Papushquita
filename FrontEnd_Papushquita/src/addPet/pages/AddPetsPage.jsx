import React from 'react'
import { useForm, usePetStore } from '../../hooks'

import { useState } from "react";
import axios from "axios";

const petFormFields = {
    petName:       "carla",
    petType:       "cat",
    petBreed:      "mestizo",
    petAge:        "1 año",
    petGender:     "hembra",
    petSize:       "chico",
    petNotes:      "cariñoso, muerde mucho",
    petAddress:    "manuel estrada 2194"
}

/* const petFormFields = {
    petName:       "",
    petType:       "",
    petBreed:      "",
    petAge:        "",
    petGender:     "",
    petSize:       "",
    petNotes:      "",
    petAddress:    ""
} */

export const AddPetsPage = () => {

    const { startSavePet, addPetImage} = usePetStore();

    const { petName, petType, petBreed, petAge, petGender, petSize, petAddress, onInputChange, petNotes } = useForm( petFormFields );


    const petSubmit = ( event ) => {
        event.preventDefault();
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
            
        })
    }

    const [file, setFile] = useState(null);

    const UPLOAD_ENDPOINT =
        "C:\Users\Admin\Documents\Papushquita\images";

    const handleSubmit = async e => {
        e.preventDefault();
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        let res = await uploadFile(file);
        console.log(res.data);
    };

    const uploadFile = async file => {
        const formData = new FormData();
        formData.append("file", file);
        //formData.append("id", file);

        return await axios.post(UPLOAD_ENDPOINT, formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
        });
    };

    const handleOnChange = e => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };


  return (
    <>
        <form onSubmit={ petSubmit }>
            <div className="form-row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="name" name="petName" value={ petName } onChange = { onInputChange } />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="type" name="petType" value={ petType } onChange = { onInputChange } />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="breed" name="petBreed" value={ petBreed } onChange = { onInputChange } />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="age" name="petAge" value={ petAge } onChange = { onInputChange } />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="gender" name="petGender" value={ petGender } onChange = { onInputChange } />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="size" name="petSize" value={ petSize } onChange = { onInputChange } />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="address" name="petAddress" value={ petAddress } onChange = { onInputChange } />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="notes" name="petNotes" value={ petNotes } onChange = { onInputChange } />
                </div>
                <div>
                <input 
                    type="submit"
                    className="btnSubmit"
                    value="Guardar" 
                />
                </div>
            </div>
            
        </form>
        <form onSubmit={petSubmit}>
            <h1>React File Upload</h1>
            <input type="file" onChange={handleOnChange} />
            <button type="submit">Upload File</button>
        </form>
    </>
  )
}
