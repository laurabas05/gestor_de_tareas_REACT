import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // para leer el token de google

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // al cargar, se busca al usuario en el localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        // se ha encontrado usuario en localStorage? lo carga
        // que no? devuelve q user es null
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // se ejecuta cada vez q el usuario se loguea o desloguea
    useEffect(() => {
        // si el usuario se loguea, lo guarda
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        // si se desloguea, lo borra para q la sesión se quede cerrada
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // credentialResponse es el paquete q envia google despues de logearse
    const login = (credentialResponse) => {
        // extrae objeto con el nombre, email y foto
        const decoded = jwtDecode(credentialResponse.credential);
        // guarda el objeto en el estado global user
        setUser(decoded);
    };

    const logout = () => {
        // estado global user se marca como null
        setUser(null);
        // borra al usuario también del localStorage para evitar
        // q se autologuee al recargar la página
        localStorage.removeItem("user");
    };

    // finalmente, se comparte todo con los demas componentes
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);