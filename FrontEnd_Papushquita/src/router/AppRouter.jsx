import { Routes, Route} from "react-router-dom";

import { PapushquitaPage } from "../papushquita";
import { LoginPage, UserVerifyPage, EditUserPage, ViewUserPage } from '../auth/';
import { MyPetsPage,  EditPetsPage, AddPetsPage } from '../pets/'
import { SentSolicitudesPage, SolicitudesPage } from '../solicitude/'


export const AppRouter = () => {
  
  //  const authStatus = 'nt-authenticated';
  
  
    return (
    <Routes>
        
            <Route path="/pets/*" element={ <AddPetsPage /> } />
            <Route path="/pets/myPets" element={ <MyPetsPage /> } />
            <Route path="/pets/editPets" exact element={ <EditPetsPage/> } />
            <Route path="/auth/*" element={ <LoginPage /> } />
            <Route path="/auth/userVerify/*" element={ <UserVerifyPage /> } />
            <Route path="/auth/viewUser/*" element={ <ViewUserPage /> } />
            <Route path="/auth/editUser/*" element={ <EditUserPage /> } />
            <Route path="/solicitude/*" element={ <SolicitudesPage /> } />
            <Route path="/solicitude/sent/*" element={ <SentSolicitudesPage /> } />
            <Route path="/*" element={ <PapushquitaPage /> } />

       
    </Routes>
  )
}
