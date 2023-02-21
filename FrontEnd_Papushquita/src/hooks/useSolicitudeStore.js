
import { papushquitaApi } from "../api";

export const useSolicitudeStore = () => {



  const viewSolicitude = async() => {
      try {
          const resp = await papushquitaApi.get('/solicitude/view')
          return resp

      } catch (error) {
          console.log({ error })
      }
  }

  const viewSentSolicitude = async() => {
    try {
        const resp = await papushquitaApi.get('/solicitude/sent/view')
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

  const viewUser = async(solicitude) => {
      try {
        console.log(solicitude)
        const resp = await papushquitaApi.post('solicitude/view', solicitude)
        console.log(resp)
        return resp
        
      } catch (error) {
        console.log({ error })
      }
  }

  const deleteSolicitude = async(solicitudeId) => {
    try {
        const resp = await papushquitaApi.delete(`/solicitude/sent/${solicitudeId}`)
        return resp

    } catch (error) {
        console.log({ error })
    }
  }

  const modifySolicitude = async(solicitudeId, status) => {
    try {
      const resp = await papushquitaApi.put(`solicitude/modify/${solicitudeId}`, {status})
      console.log(resp)
      return resp
      
    } catch (error) {
      console.log({ error })
    }
  }

  const modifyOtherSolicitude = async(petId, solicitudId) => {
    try {
      const resp = await papushquitaApi.put(`solicitude/modify/other/${petId}`, {solicitudId})
      console.log(resp)
      return resp
      
    } catch (error) {
      console.log({ error })
    }
  }



  return {
    //*propiedades

    //*metodos
    viewSolicitude,
    sendSolicitude,
    viewUser,
    viewSentSolicitude,
    deleteSolicitude,
    modifySolicitude,
    modifyOtherSolicitude

  }
    
  
}
