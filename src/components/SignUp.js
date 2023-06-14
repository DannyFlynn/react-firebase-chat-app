import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

//hooks
import { useUser } from '../hooks/useUser';

const SignUp = ({ existingMember }) => {

    const { registerUser } = useUser();

    const {
        register, control, handleSubmit, formState: { errors }, watch,
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const createUser = (formValues) => {

        const { email, password } = formValues
        registerUser(email, password, existingMember)

    }

    return (
        <Container className='w-100 d-flex flex-lg-row flex-column  justify-content-center justify-content-lg-between align-items-center my-1  forms-container'>
            <div className='w-50  d-flex flex-column  text-white  align-items-center brandname-big-screen'>
                <h1 className='display-1'>InstaMessage</h1>
                <h4 className='text-center d-none d-lg-block'>
                    "Break the distance, bridge the gap, and discover meaningful connections - InstaMessage, where conversations come alive and friendships thrive."</h4>
            </div>
            <div className="shadow p-3 mb-5  rounded sign-in-form">
                <Form onSubmit={handleSubmit(createUser)} className='flex-form' >
                    <div className='d-flex justify-content-end'>
                        <div className='mt-3 mt-lg-1'>
                            <span
                                onClick={existingMember}
                                className='mt-3 p-2  highlight fw-bold'  >already a member?...</span>
                        </div>
                    </div>
                    <Form.Group as={Row} className="my-3 pt-2 d-flex flex-column justify-content-center align-items-center">
                        <Form.Label column className='fw-bold'>
                            Email
                        </Form.Label>
                        <Col>
                            <Form.Control type='email'  {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                            {errors.email && <span className='fw-italic error'>Email is required and must be valid.</span>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-3  d-flex flex-column">
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
                    <Form.Group as={Row} className="my-3  d-flex flex-column">
                        <Form.Label column className='fw-bold'>
                            Re-type password
                        </Form.Label>
                        <Col>
                            <Form.Control name="password_repeat"
                                type="password" {...register('password_repeat', {
                                    validate: value =>
                                        value === password.current || "The passwords do not match"
                                })} />
                            {errors.password_repeat && <span className='fw-italic error'>{errors.password_repeat.message}</span>}
                        </Col>
                    </Form.Group>
                    <div className='p-2 d-flex justify-content-center'>
                        <button className='register-btn'>Sign-Up</button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default SignUp