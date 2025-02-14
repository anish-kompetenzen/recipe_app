import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormControl } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("This error may have occurred if you have directly navigated to this page or something may have gone wrong.No need to worry navigate back and register again.");
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(location?.state?.user || {
        userName: "",
        userEmail: "",
        userPass: ""
    });

    useEffect(() => {
        if (user.userName === "" || user.userEmail === "" || user.userPass === "") {
            setError(true);
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        if (userEmail === user.userEmail && userPass === user.userPass) {
            navigate("/d", {
                state: {
                    user: user
                }
            })
        } else {
            setErrorMessage("Credentials Incorrect!!");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }

    return (
        <>
            {error ?
                <div className='container w-50 mt-5'>
                    <Card>
                        <CardHeader>
                            <h1>Error!!!</h1>
                        </CardHeader>
                        <CardBody>
                            {errorMessage}
                        </CardBody>
                        <CardFooter>
                            {errorMessage === "Credentials Incorrect!!" ? <></> : <Button onClick={() => navigate("/")}>Go Back</Button>}
                        </CardFooter>
                    </Card>
                </div> :
                <div className='container w-50 mt-5'>
                    <Card>
                        <CardHeader>
                            <h2>Hi {user.userName}, Login Here</h2>
                        </CardHeader>
                        <Form method='post' onSubmit={handleSubmit}>
                            <CardBody>
                                <FormControl type='email' name='userEmail' placeholder='Enter your email' className='mb-1' required autoFocus
                                    onChange={(event) => setUserEmail(event.target.value)} value={userEmail} />
                                <FormControl type='password' name='userPass' placeholder='Enter your password' required
                                    onChange={(event) => setUserPass(event.target.value)} value={userPass} />
                            </CardBody>
                            <div className="card-footer">
                                <Button type='submit'>Login</Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            }
        </>
    )
}

export default Login