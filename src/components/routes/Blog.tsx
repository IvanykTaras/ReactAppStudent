import { FC, useContext, useEffect, useState } from "react";
import { dbContext, userIdContext } from "./App";
import {Comment} from "../common/Comment";
import { Alert, Button, Card, Container } from "react-bootstrap";
import { Post } from "../../model/Post";
import { useNavigate } from "react-router-dom";

export const Blog: FC = ()=>{
    const db = useContext(dbContext);
    const existedUser = useContext(userIdContext);
    const navigate = useNavigate();
    const [show,setShow] = useState<boolean>(false);
    const [idOfPostForComments, setIdOfPostForComments] = useState<number>(-1);

    useEffect(()=>{
        if(db.db.posts.length == 0){
            navigate("/");
        }
    },[])


    function showComments(postId: number){
        setShow(true);
        setIdOfPostForComments(postId);
    }

    function hideComments(){
        setShow(false);
        setIdOfPostForComments(-1);
    }

    


    return <>
    <Container>
    {
        db.db.posts.reverse().map((post:Post)=>{
            
            return(
            <Card key={post.id} className="mb-2">
                <Card.Img style={{maxHeight:"200px", width: "100%"}} variant="top" src={post.image} />
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                        {post.body}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    User email: <Button variant="info" disabled>{db.db.users[db.db.users.findIndex(e=>e.id === post.userId)].email}</Button>
                    <Button onClick={()=>showComments(post.id)} style={{marginLeft: "1rem"}} variant="secondary">Comments</Button>
                </Card.Footer>
            </Card>)
        })
    }

        <Comment show={show} handleClose={hideComments} postId={idOfPostForComments}/>


    </Container>
    </>
} 