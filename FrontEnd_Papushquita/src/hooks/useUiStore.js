import { useSelector, useDispatch } from 'react-redux';
import { onOpenDateModal, onCloseDateModal } from '../store';


export const useUiStore = () => {

    const dispatch = useDispatch();
    
    const { 
        isDateModalOpen 
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closedateModal = () => {
        dispatch( onCloseDateModal() )
    }

    return {
        //propiedades
        isDateModalOpen,

        //metodos
        openDateModal,
        closedateModal,
    }



}