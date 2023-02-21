import { useDispatch, useSelector } from "react-redux";
import { papushquitaApi } from "../api";
import {  onAddNewPet, onDeletePet, onLoadPets } from "../store";



export const usePetStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    
    const startSavePet = async( name, type, breed, age, gender, size, address ) => {

        try {
            const { data } = await papushquitaApi.post('/pets', name, type, breed, age, gender, size, address )
            dispatch( onAddNewPet({ 
                name: data.name, 
                type: data.type, 
                breed: data.breed, 
                age: data.age,
                gender: data.gender, 
                size: data.size,
                notes: data.notes,
                address: data.address 
            }) );
            return data
            
        } catch (error) {
           console.log(error)
        }

    

    }


    const viewPets = async() => {
        try {
            const resp = await papushquitaApi.get('/pets')
            //dispatch( onLoadPets(resp.data) );
            return resp

        } catch (error) {
            console.log({ error })
        }
    }

    const viewMyPets = async() => {
        try {
            const resp = await papushquitaApi.get('/pets/myPets')
            return resp

        } catch (error) {
            console.log({ error })
        }
    }

    const deletePet = async(petId) => {
        try {
            const resp = await papushquitaApi.delete(`/pets/${petId}`)
            return resp

        } catch (error) {
            console.log({ error })
        }
    }

    const addPetImage = async(req) => {
        try {
            console.log("ACAAAA LA CTM")
            console.log(req)

            const formData = new FormData();
            formData.append("image", req.file);
            formData.append("address", req.address);
            formData.append("age", req.age);
            formData.append("breed", req.breed);
            formData.append("gender", req.gender);
            formData.append("id", req.id);
            formData.append("inAdoption", req.inAdoption);
            formData.append("name", req.name);
            formData.append("notes", req.notes);
            formData.append("size", req.size);
            formData.append("type", req.type);
            formData.append("user", req.user);

            const { data } = await papushquitaApi.post(`/pets/upload`, formData)

            
        } catch (error) {
            console.log({ error })
        }
    }

    const startEditPet = async(pet) => {
        try {
            console.log(pet.id)
            const resp = await papushquitaApi.put(`/pets/${pet.id}`, {data:pet}) 
            return resp
            
        } catch (error) {
            console.log(error)
        }
    }

    const startAdoptPet = async(petId) => {
        try {
            const resp = await papushquitaApi.put(`/pets/adopt/${petId}`) 
            return resp
            
        } catch (error) {
            console.log(error)
        }
    }



    return {
        //*propiedades
        status, 
        user, 
        errorMessage,
        


        //*metodos
        startSavePet,
        viewPets,
        addPetImage,
        viewMyPets,
        deletePet,
        startEditPet,
        startAdoptPet
        
    }
}
