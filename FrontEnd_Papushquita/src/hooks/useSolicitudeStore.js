
import { papushquitaApi } from "../api";
import { useSelector } from "react-redux";

export const useSolicitudeStore = () => {


    const viewSolicitude = async() => {
        try {
            const resp = await papushquitaApi.get('/solicitude/view')
            return resp

        } catch (error) {
            console.log({ error })
        }
    }

    const sendSolicitude = async(data) => {
      console.log(data)
        try {
          const resp = await papushquitaApi.post('solicitude/new', {data})
          return resp
          
        } catch (error) {
          console.log({ error })
        }
    }



  return {
    //*propiedades


    //*metodos
    viewSolicitude,
    sendSolicitude

  }
    
  
}
