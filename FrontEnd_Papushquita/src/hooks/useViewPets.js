import { isThursday } from 'date-fns';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { papushquitaApi } from '../api';



export const useViewPets = () => {

    //const [pets, setPets] = useState()

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const viewPets = async( pets ) => {
        //console.log(pets)
        try {
            const resp = await papushquitaApi.get('/pets')
            console.log(resp)

        } catch (error) {
            console.log({ error })
        }
    }





    return {
        //*propiedades
        status, 
        user, 
        errorMessage,
        


        //*metodos
        viewPets
        
    }
}
