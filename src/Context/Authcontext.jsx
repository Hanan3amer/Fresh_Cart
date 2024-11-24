import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

export default function AuthContextprovider(props) {
    const [userLogin, SetuserLogin] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            SetuserLogin(localStorage.getItem('userToken'))
        }
    }, [])
    return <AuthContext.Provider value={{ userLogin, SetuserLogin }}>
        {props.children}
    </AuthContext.Provider>

}
