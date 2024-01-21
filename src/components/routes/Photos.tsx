import { FC, useContext, useEffect, useState } from "react";
import { Card, CardGroup, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Photo } from "../../model/Photo";
import { Loadding } from "./Loadding";
import { useNavigate } from "react-router-dom";
import { dbContext } from "./App";


type photoForm = {
    id: number;
    albumId: number;
}

export const Photos: FC = ()=>{
    


    const navigate = useNavigate()
    const db = useContext(dbContext)

    const [ photo , setPhoto ] = useState<photoForm>({
        id: 0,
        albumId: 0
    });


    useEffect(()=>{
        if(db.db.albums.length == 0){
            navigate("/");
        }
    },[])


    return <>
        <h1 className="text-center">Search Photos</h1>
        
    
            <Row className="d-flex justify-content-center mt-4">
                <Col sm={3}>
                    <InputGroup className="mb-3 " >
                        <InputGroup.Text className="border-dark bg-secondary text-white">id of photo</InputGroup.Text>
                        <Form.Control style={{width: "100px"}} type="number" className="border-dark" onChange={e=>setPhoto({...photo, id: Number(e.target.value)})} value={photo.id}/>
                    </InputGroup>
                </Col >
                <Col sm={3}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="border-dark bg-secondary text-white">id of album</InputGroup.Text>
                        <Form.Control type="number" className="border-dark" onChange={e=>setPhoto({...photo, albumId: Number(e.target.value)})} value={photo.albumId}/>
                    </InputGroup>
                </Col>
                <Col sm={3}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="border-dark bg-secondary text-white">found {db.db.photos.filter((e:Photo)=>(photo.id == 0 && photo.albumId == 0) ? true : ( photo.albumId != 0 ? (e.id == photo.id && e.albumId == photo.albumId && photo.id > 0) : (e.id == photo.id) )).length}</InputGroup.Text>
                    </InputGroup>
                </Col>
                
            </Row>
            <Row  className="m-3">
                {  
                    db.db.photos.filter((e:Photo)=>(photo.id == 0 && photo.albumId == 0) ? true : ( photo.albumId != 0 ? ( photo.id > 0 ? (e.albumId == photo.albumId && e.id === photo.id) : e.albumId === photo.albumId ) : (e.id == photo.id) )).map((e,id) => {
                        
                        const photo: Photo = e;
                        
                        return (
                            <Col sm={2} className="mt-4" key={id}>
                                <Card>
                                    <Card.Img variant="top" src={photo.url} />
                                    <Card.Footer>
                                        <small className="text-muted">id: {photo.id} / album id: {photo.albumId}</small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })
                }
                
            </Row>
        
    </>
}