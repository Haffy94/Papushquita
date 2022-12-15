import { Routes, Route, Navigate } from "react-router-dom";
import { AddPetsPage } from "../addPet";

import { LoginPage } from '../auth/';
import { PapushquitaPage } from "../papushquita";
import { MyPetsPage } from "../myPets/";
import { EditPetsPage } from "../editPetPage/pages/EditPetPage";

export const AppRouter = () => {
  
  //  const authStatus = 'nt-authenticated';
  
  
    return (
    <Routes>
        
            <Route path="/pets/*" element={ <AddPetsPage /> } />
            <Route path="/pets/myPets" element={ <MyPetsPage /> } />
            <Route path="/pets/editPets" exact element={ <EditPetsPage/> } />
            <Route path="/auth/*" element={ <LoginPage /> } />
            <Route path="/*" element={ <PapushquitaPage /> } />
        
        
       
    </Routes>
  )
}
