import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from '../auth/';
import { CalendarPage } from '../calendar';
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";
import { PapushquitaPage } from "../papushquita";

export const AppRouter = () => {
  
  //  const authStatus = 'nt-authenticated';
  
  
    return (
    <Routes>
        
            <Route path="/auth/*" element={ <LoginPage /> } />
            <Route path="/*" element={ <PapushquitaPage /> } />
        
        
       
    </Routes>
  )
}
