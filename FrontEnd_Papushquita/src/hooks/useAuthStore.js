import { useDispatch, useSelector } from 'react-redux';
import { papushquitaApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    const startLogin = async({ email, password }) => {
       dispatch( onChecking() );

        try {

            const { data } = await papushquitaApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout('Credenciales Incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
            
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch( onChecking() );
 
         try {
 
             const { data } = await papushquitaApi.post('/auth/new', { name, email, password })
             //localStorage.setItem('token', data.token);
             //localStorage.setItem('token-init-date', new Date().getTime() );
             dispatch( onLogin({ name: data.name, uid: data.uid }) );
             
         } catch (error) {
             dispatch( onLogout( error.response.data?.msg || '') );
             setTimeout(() => {
                 dispatch( clearErrorMessage() );
             }, 10);
             
         }
     }

     const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() )

        try {
            const { data } = await papushquitaApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout('su sesion expiró!') );
            
        }
     }

     const statusLogin = () => {
        const token = localStorage.getItem('token');
        if ( !token ) return 'not-authenticated';
        return 'authenticated'
     }

     const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
     }


    return {
        //*propiedades
        status, 
        user, 
        errorMessage,


        //*metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        statusLogin
    }

}
