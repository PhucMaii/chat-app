import React from 'react'
import {useNavigate} from 'react-router-dom'
import {auth} from '../firebase/config'
import {Spin} from 'antd'
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = React.useState({})
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true); 
    
    React.useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            console.log({user});
    
            if(user) {
                const {displayName, email, uid, photoURL} = user
                setUser({
                    displayName, email, uid, photoURL
                });

                setIsLoading(false);
                navigate('/');
            }
            else {
                setIsLoading(false);
                navigate('/login');

            }
        })

        // cleanup function
        return () => {
            unsubscribed();
        }
        
    }, [navigate])

    return (
    <AuthContext.Provider value={{user}}>
        {isLoading ? <Spin/> : children}
    </AuthContext.Provider>
  )
}
