import {FC, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { dbContext } from "./App";
import { Alert, Button, Col, Container, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { Photo } from "../../model/Photo";
import { User } from "../../model/User";

export const Users: FC = ()=>{

    const navigate = useNavigate()
    const db = useContext(dbContext)

    const [ name , setName ] = useState<string>("");
    const [selectedUser,setSelectedUser] = useState<User>(db.db.users[0]);
    const [show, setShow] = useState<boolean>(false);

    useEffect(()=>{
        if(db.db.users.length == 0){
            navigate("/");
        }
    },[])

    function showUser(user:User){
        setSelectedUser(user);
        setShow(true);
    }

    return <>

            <Row className="d-flex justify-content-center mt-4">
                <Col sm={3}>
                    <InputGroup className="mb-3 " >
                        <InputGroup.Text className="border-dark bg-secondary text-white">name of user</InputGroup.Text>
                        <Form.Control style={{width: "100px"}} className="border-dark" onChange={e=>setName(e.target.value)} value={name}/>
                    </InputGroup>
                </Col >
            </Row>

            <Container>
                <Row>
                    {
                        db.db.users.filter( (user:User) => user.name.toLowerCase().includes(name.toLowerCase())).map( (user:User) => {
                            return (
                                <Col sm={3} style={{cursor: "pointer"}}>
                                    <Alert onClick={()=>showUser(user)} variant="info" className="text-center">{user.name}</Alert>
                                </Col>
                            )
                        })
                    }
                    
                </Row>
            </Container>


            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton/>
                
                
                <Modal.Body>
                <Table className="mx-auto border border-dark" striped>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>email</th>
                            <th>name</th>
                            <th>userName</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{selectedUser.id}</td>
                            <td>{selectedUser.email}</td>
                            <td>{selectedUser.name}</td>
                            <td>{selectedUser.username}</td>
                        </tr>
                    </tbody>
                </Table>
                </Modal.Body>
                
            </Modal>

    </>
}