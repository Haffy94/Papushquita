import { useAuthStore, useForm } from '../../hooks'

import Swal from 'sweetalert2';

import { useState } from "react";

import { useLocation } from "react-router-dom";




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

export const EditUserPage = () => {

  const [userMod, setUserMod] = useState(useLocation().state)

  const { startVerifyUser } = useAuthStore()

  const { 
          fullName, contactPhone, documentType, documentId, address, houseType, houseType2, 
          familymembers, experienceWhitOtherPets, otherAnimalsCastration, windowsProtect,
          name,
          onInputChange } = useForm( userMod );

  const userVerifySubmit = ( event ) => {
      event.preventDefault();
      startVerifyUser({
          name: name,
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
          Swal.fire('Usuario Modificado!', '', 'success')
              .then((result) => {
          window.location.replace('http://localhost:5173/');
        });
          
      })
  }




return (
  <>
    <div style={{ margin: "auto", width: "600px" }}>
        <form onSubmit={ userVerifySubmit }>
            <h2> Edicion de Usuario </h2>
            &nbsp;
            <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form6Example1" className="form-control" placeholder="" name="name" value={ name } onChange = { onInputChange } />
                        <label className="form-label" htmlFor="form6Example1">Nombre</label>
                    </div>
                </div>
                <div className="row mb-4">

                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form6Example1" className="form-control" placeholder="" name="fullName" value={ fullName } onChange = { onInputChange } />
                        <label className="form-label" htmlFor="form6Example1">Nombre Completo</label>
                    </div>
                </div>
                
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form6Example1" className="form-control" placeholder="" name="contactPhone" value={ contactPhone } onChange = { onInputChange } />
                        <label className="form-label" htmlFor="form6Example1">Numero Telefonico</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <select className="form-select" aria-label="Disabled select example" placeholder="type" name="documentType" value={ documentType } onChange = { onInputChange }>
                            <option defaultValue>Selecione una opcion</option>
                            <option value="DNI">DNI</option>
                            <option value="Cedula de Identidad">Cedula de Identidad</option>
                        </select>
                        <label className="form-label" htmlFor="form6Example2">Tipo de Documento</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form6Example1" className="form-control" placeholder="" name="documentId" value={ documentId } onChange = { onInputChange } />
                        <label className="form-label" htmlFor="form6Example1">Numero de Documento</label>
                    </div>
                </div>
            </div>


            <div className="form-outline mb-4">
                <input type="text" id="form6Example3" className="form-control" placeholder="" name="address" value={ address } onChange = { onInputChange } />
                <label className="form-label" htmlFor="form6Example3">Domicilio</label>
            </div>

            <div className="row mb-4">

                <div className="col">
                    <div className="form-outline">
                        <select className="form-select" aria-label="Disabled select example" placeholder="" name="houseType" value={ houseType } onChange = { onInputChange } >
                            <option defaultValue>Seleccione una Opcion</option>
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                        </select>
                        <label className="form-label" htmlFor="form6Example2">TIpo de Hogar</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <select className="form-select" aria-label="Disabled select example" placeholder="" name="houseType2" value={ houseType2 } onChange = { onInputChange }>
                            <option defaultValue>Seleccione una Opcion</option>
                            <option value="Inquilino">Inquilino</option>
                            <option value="Propietario">Propietario</option>
                        </select>
                        <label className="form-label" htmlFor="form6Example2">¿Es Inquilino o Propietario?</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="form6Example1" className="form-control" placeholder="" name="familymembers" value={ familymembers } onChange = { onInputChange } />
                        <label className="form-label" htmlFor="form6Example1">Cantidad de personas que viven en el hogar</label>
                    </div>
                </div>
            </div>

            <div className="row mb-4">

                <div className="col">
                    <div className="form-outline">
                        <select className="form-select" aria-label="Disabled select example" placeholder="" name="experienceWhitOtherPets" value={ experienceWhitOtherPets } onChange = { onInputChange } >
                            <option defaultValue>Seleccione una Opcion</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                        <label className="form-label" htmlFor="form6Example2">¿Posee experiencia con otras mascotas?</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <select className="form-select" aria-label="Disabled select example" placeholder="" name="otherAnimalsCastration" value={ otherAnimalsCastration } onChange = { onInputChange }>
                            <option defaultValue>Seleccione una Opcion</option>
                            <option value="Si, todo estan castrados">Si, todo estan castrados</option>
                            <option value="algunos SI otros NO">algunos SI otros NO</option>
                            <option value="No castre aun pero lo voy a hacer">No castre aun pero lo voy a hacer</option>
                            <option value="No estan Castrados">No estan Castrados</option>
                            <option value="No tengo Otros animales">No tengo Otros animales</option>
                        </select>
                        <label className="form-label" htmlFor="form6Example2">¿El resto de sus mascotas estan castradas</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <select className="form-select" aria-label="Disabled select example" placeholder="" name="windowsProtect" value={ windowsProtect } onChange = { onInputChange } >
                            <option defaultValue>Seleccione una Opcion</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                        <label className="form-label" htmlFor="form6Example2">¿Posee proteccion de ventana?</label>
                    </div>

                </div>
                
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4" onChange={onInputChange} >Aceptar</button>
        </form>
    </div>
  
  </>

  )
}
