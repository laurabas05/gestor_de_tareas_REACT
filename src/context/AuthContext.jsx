import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Para leer el token de Google [cite: 18]

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Persistencia: Al cargar, busca al usuario en localStorage [cite: 8, 24]
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Guardar usuario en el "disco duro" cuando cambie [cite: 24]
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential); // Extrae nombre, foto y email [cite: 6, 7]
        setUser(decoded);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Limpia sesión [cite: 22]
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);