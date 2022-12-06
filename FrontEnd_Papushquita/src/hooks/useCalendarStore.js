import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        //TODO: LLEGAR AL BACKEND

        //TODO: LLEGO OK
        if( calendarEvent._id ){
            //actualizando
            dispatch( onUpdateEvent( {...calendarEvent} ) );

        } else {
            //creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }   
    }

    const startDeleteEvent = async() => {
        dispatch( onDeleteEvent() );
    }
  
  
    return {
        //prop
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        

    }
}


