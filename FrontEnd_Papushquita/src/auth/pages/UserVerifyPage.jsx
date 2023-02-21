import React from 'react'
import { useAuthStore, useForm } from '../../hooks'

import Swal from 'sweetalert2';

import { useState } from "react";


const userVerifyFormFields = {
    fullName:                   "",
    contactPhone:               "",
    documentType:               "",
    documentId:                 "",
    address:                    "",
    houseType:                  "",
    houseType2:                 "",
    familymembers:              "",   
    experienceWhitOtherPets:    "",
    otherAnimalsCastration:     "",
    windowsProtect:             ""
}

export const UserVerifyPage = () => {

    const { startVerifyUser } = useAuthStore()

    const { 
            fullName, contactPhone, documentType, documentId, address, houseType, houseType2, 
            familymembers, experienceWhitOtherPets, otherAnimalsCastration, windowsProtect, 
            onInputChange } = useForm( userVerifyFormFields );

    const userVerifySubmit = ( event ) => {
        event.preventDefault();
        startVerifyUser({
            fullName: fullName, 
            contactPhone: contactPhone, 
            documentType: documentType, 
            documentId: documentId, 
            address: address, 
            houseType: houseType,
            houseType2: houseType2, 
            familymembers: familymembers,
            experienceWhitOtherPets: experienceWhitOtherPets,
            otherAnimalsCastration: otherAnimalsCastration,
            windowsProtect: windowsProtect
        }).then( res => {
            Swal.fire('Usuario verificado!', '', 'success')
                .then((result) => {
            window.location.replace('http://localhost:5173/');
          });
            
        })
    }




  return (

        <div style={{ margin: "auto", width: "600px" }}>
            <form onSubmit={ userVerifySubmit }>
                <h2>Formulario de verificación</h2>
                &nbsp;
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="fullName" className="form-control" name="fullName" value={ fullName } onChange={ onInputChange } />
                            <label className="form-label" htmlFor="fullName">Nombre completo</label>
                        </div>
                    </div>                   
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="contactPhone" className="form-control" name="contactPhone" value={ contactPhone } onChange={ onInputChange } />
                            <label className="form-label" htmlFor="contactPhone">Número telefónico</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" name="documentType" value={ documentType } onChange={ onInputChange }>
                                <option value="DNI">DNI</option>
                                <option value="Cédula de identidad">Cédula de identidad</option>
                            </select>
                            <label className="form-label" htmlFor="documentType">Tipo de documento</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="documentId" className="form-control" name="documentId" value={ documentId } onChange={ onInputChange } />
                            <label className="form-label" htmlFor="documentId">Número de documento</label>
                        </div>
                    </div>
                </div>

                <div className="form-outline mb-4">
                    <input type="text" id="address" className="form-control" name="address" value={ address } onChange={ onInputChange } />
                    <label className="form-label" htmlFor="address">Domicilio</label>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" name="houseType" value={ houseType } onChange={ onInputChange } >
                                <option value="Casa">Casa</option>
                                <option value="Departamento">Departamento</option>
                            </select>
                            <label className="form-label" htmlFor="houseType">Tipo de hogar</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" name="houseType2" value={ houseType2 } onChange={ onInputChange }>
                                <option value="Inquilino">Inquilino</option>
                                <option value="Propietario">Propietario</option>
                            </select>
                            <label className="form-label" htmlFor="houseType2">¿Es inquilino o propietario?</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="familymembers" className="form-control" name="familymembers" value={ familymembers } onChange={ onInputChange } />
                            <label className="form-label" htmlFor="familymembers">Cantidad de personas que viven en el hogar</label>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">

                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" name="experienceWhitOtherPets" value={ experienceWhitOtherPets } onChange = { onInputChange } >
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                            <label className="form-label" htmlFor="experienceWhitOtherPets">¿Posee experiencia con otras mascotas?</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" name="otherAnimalsCastration" value={ otherAnimalsCastration } onChange = { onInputChange }>
                                <option value="Si, todas están castradas">Si, todas están castradas</option>
                                <option value="Algunas si otras no">Algunas si otras no</option>
                                <option value="No castre aun, pero lo voy a hacer">No castre aun, pero lo voy a hacer</option>
                                <option value="No están castradas">No están castradas</option>
                                <option value="No tengo otras mascotas">No tengo otras mascotas</option>
                            </select>
                            <label className="form-label" htmlFor="otherAnimalsCastration">¿El resto de sus mascotas están castradas</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <select className="form-select" name="windowsProtect" value={ windowsProtect } onChange = { onInputChange } >
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                            <label className="form-label" htmlFor="windowsProtect">¿Posee protección de ventana?</label>
                        </div>

                    </div>
                    
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4" onChange={onInputChange} >Aceptar</button>
            </form>
        </div>

    )
}
