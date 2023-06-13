import { useState } from 'react'
//components
import SignUp from '../components/SignUp'
import Login from '../components/Login'


const UserCredentials = ({ setIsAuth }) => {

    const [signUpToggle, setSignUpToggle] = useState(false);

    const newMember = () => {
        setSignUpToggle(!signUpToggle);
    }

    return (
        <>
            {signUpToggle === false ?
                <Login newMember={newMember} setIsAuth={setIsAuth} />
                :
                <SignUp existingMember={newMember} />
            }

        </>
    )
}

export default UserCredentials