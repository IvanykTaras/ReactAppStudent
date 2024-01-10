import { FC, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import "../../css/Register.css"
import { RegisterFormData } from "../../model/RegisterFormData";
import { object, string } from "yup";
import { db } from "../../db";
import { User } from "../../model/User";

export const Register: FC = ()=>{


    let formSchema = object({
        name: string().required(),
        phone: string().required(),
        username: string().required(),
        website: string().required(),
        city: string().required(),
        street: string().required(),
        zipcode: string().required(),
        catchPhrase: string().required(),
        nameOfCompany: string().required(),
        email: string().required().email(),
        password: string().required()
    });

    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [isUserCreated, setIsUserCreated] = useState<boolean>(false);
    const [formData,setFormData] = useState<RegisterFormData>({
        name: "",
        phone: "",
        username: "",
        website: "",
        city: "",
        street: "",
        zipcode: "",
        catchPhrase: "",
        nameOfCompany: "",
        email: "",
        password: ""
    });


    async function validUserData(form:RegisterFormData) {

        setErrorMessage(null);

        try {
            await formSchema.validate(form);
            return true;       
        } catch (error){
            if(error instanceof Error){
                setErrorMessage(error.message);
            }
            return false;
        }
        
    }

    async function RegisterUser(form:RegisterFormData){
        
        setErrorMessage(null);
        setIsUserCreated(false);
        const status = await validUserData(form);

        let emailExist = false;
        for (let e of db.users) {
            const userElement: User = e;

            if(form.email == userElement.email){
                setErrorMessage("Email exist pls use another");
                emailExist = true;
                break;
            }          
        }

        if(!emailExist && status){
            const lastUser:User = db.users[db.users.length - 1];

            const createUser:User = {
                id: lastUser.id + 1,
                bs: "",
                ...form
            };
            
            db.users.push(createUser);
            setIsUserCreated(true);
             
        }
    }


    return <>
    <h1 className="title">Register</h1>
    <Container className="loging_container mt-5">
        
        <Card className="loging_card">
            <Card.Body>
                {
                    errorMessage && (
                    <Alert className="mt-1" variant="danger" onClick={()=>setErrorMessage(null)}>
                        {errorMessage}
                    </Alert>)
                }
                {
                    isUserCreated && (
                    <Alert className="mt-1" variant="success" onClick={()=>setIsUserCreated(false)}>
                        User created
                    </Alert>)
                }
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    email: e.target.value
                                })}
                                value={formData.email}  
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Password"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    password: e.target.value
                                })}
                                value={formData.password} 
                            />
                        </Form.Group>
                    </Row>
                    
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Name" 
                                onChange={e=>setFormData({
                                    ...formData,   
                                    name: e.target.value
                                })}
                                value={formData.name}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Phone"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    phone: e.target.value
                                })}
                                value={formData.phone}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    username: e.target.value
                                })}
                                value={formData.username}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridWebsite">
                            <Form.Label>Website</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Website"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    website: e.target.value
                                })}
                                value={formData.website}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter City"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    city: e.target.value
                                })}
                                value={formData.city}
                            />
                        </Form.Group>
                    </Row>

                    
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridStreet">
                            <Form.Label>Street</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Street"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    street: e.target.value
                                })}
                                value={formData.street}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZipcode">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Zipcode"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    zipcode: e.target.value
                                })}
                                value={formData.zipcode}
                            />
                        </Form.Group>
                    </Row>

                    
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNameOfJob">
                            <Form.Label>Name of Company</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Name of Company"
                                onChange={e=>setFormData({
                                    ...formData,   
                                    nameOfCompany: e.target.value
                                })}
                                value={formData.nameOfCompany}
                             />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridcatchPhrase">
                            <Form.Label>Catch Phrase</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Catch Phrase"
                                onChange={e=>setFormData({
                                    ...formData,
                                    catchPhrase: e.target.value
                                })}
                                value={formData.catchPhrase}
                            />
                        </Form.Group>
                    </Row>

                    <Button variant="success" onClick={()=>RegisterUser(formData)}>
                        Register
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </Container>
    </>
}