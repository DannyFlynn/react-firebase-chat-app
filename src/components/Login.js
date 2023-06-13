import { useForm } from 'react-hook-form';

import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

//hooks
import { useUser } from '../hooks/useUser';


const Login = ({ newMember, setIsAuth }) => {


    const { loginUser } = useUser();

    const {
        register, handleSubmit, formState: { errors },
    } = useForm();

    const login = (formValues) => {

        const { email, password } = formValues
        //use hook
        loginUser(email, password, setIsAuth)
    }

    return (
        <Container className='w-100 d-flex flex-lg-row flex-column  justify-content-center justify-content-lg-between align-items-center my-1 my-md-3 forms-container'>
            <div className='w-50  d-flex flex-column  text-white  align-items-center brandname-big-screen'>
                <h1 className='display-1'>InstaMessage</h1>
                <h4 className='text-center d-none d-lg-block'>
                    "Break the distance, bridge the gap, and discover meaningful connections - InstaMessage, where conversations come alive and friendships thrive."</h4>
            </div>


            <div className="shadow p-3 mb-5  rounded login-form">
                <Form onSubmit={handleSubmit(login)} className='flex-form' >
                    <div className='d-flex justify-content-end align-items-center'>

                        <div className='mt-3 mt-lg-1'>
                            <span
                                onClick={newMember}
                                className='highlight fw-bold'  >not a member?...</span>
                        </div>
                    </div>
                    <Form.Group as={Row} className="d-flex flex-column justify-content-center align-items-center my-3">
                        <Form.Label column className='fw-bold'>
                            Email
                        </Form.Label>
                        <Col>
                            <Form.Control type='email'  {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                            {errors.email && <span className='fw-italic error'>Email is required and must be valid.</span>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="d-flex flex-column my-4">
                        <Form.Label column className='fw-bold' >
                            Password
                        </Form.Label>
                        <Col>
                            <Form.Control type="password" {...register('password', { required: true, minLength: 7 })} />
                            {errors.password && (
                                <span className='fw-italic error'>Password is required and must be at least 8 characters long.</span>
                            )}
                        </Col>
                    </Form.Group>
                    <div className='d-flex justify-content-center my-4'>
                        <button className='login-btn'>Login</button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default Login