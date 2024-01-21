import {FC, useEffect, useState, useContext} from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { object, string, number, date, InferType } from 'yup';

import "../../css/Login.css";
import { UserFormData } from "../../model/UserFormData";
import { User } from "../../model/User";
import { useNavigate } from "react-router-dom";
import { dbContext, tapeContext, userIdContext } from "./App";
import { useTape } from "../../hooks/useTape";
import { tapeTypes } from "../../model/tapeTypes";



export const Login: FC = ()=>{


    

    let userSchema = object({
        email: string().required().email(),
        password: string().required()
    });

    const navigate = useNavigate();

    const [tape, setTape] = useContext(tapeContext);

    const [userData, setUserData] = useState<UserFormData>({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState<string|null>(null);
   
    const userId = useContext(userIdContext);
    const db = useContext(dbContext);

    
    async function validUserData(user:UserFormData) {

        setErrorMessage(null);

        try {
            await userSchema.validate(user);       
        } catch (error){
            if(error instanceof Error){

                // console.log(error.message)

                if(error.message == "email must be a valid email"){
                    setErrorMessage("pls write right email");
                      
                } else if(error.message == "password is a required field"){
                    setErrorMessage("password is required");
                    
                } else if(error.message == "email is a required field"){
                    setErrorMessage("email is required");
                    
                } else{
                    throw error;
                }
            }
        }
        
    }

    function LogIn(user:UserFormData){
        
        console.log(db.db);
        
        setErrorMessage(null);
        validUserData(user);

        for (let e of db.db.users) {
            const userElement: User = e;
            
            if(
                user.email == userElement.email &&
                user.password == userElement.password
            ){
                setErrorMessage(null);
                userId.setId(userElement.id);
                setTape({type: tapeTypes.logedIn ,item: userElement.email});
                console.log(db.db.users)
                navigate("/");
                break;
            }else{
                setErrorMessage("email or password is incorrect"); 
             }            
        }

        
    }


    return (<>
    <h1 className="title">Login</h1>
    <Container>
        
        <Card className="loging_card">
            <Card.Body>
                {
                    errorMessage && (
                    <Alert className="mt-1" variant="danger" onClick={()=>setErrorMessage(null)}>
                        {errorMessage}
                    </Alert>)
                }
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            onChange={e=>setUserData({
                                ...userData,   
                                email: e.target.value
                            })}
                            value={userData.email} 
                        
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Password"
                            onChange={e=>setUserData({
                                ...userData,   
                                password: e.target.value
                            })}
                            value={userData.password} 
                        />
                    </Form.Group>
                </Form>
                <Button onClick={()=>LogIn(userData)}  variant="primary">Login</Button>
            </Card.Body>
        </Card>
    </Container>
    </>)
}