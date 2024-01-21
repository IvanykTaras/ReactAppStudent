import { FC, useContext, useEffect, useState } from "react";
import { Modal, Button, Alert, InputGroup, Form, ButtonGroup } from "react-bootstrap";
import { dbContext, userIdContext } from "../routes/App";
import { Comment as CommentModel } from "../../model/Comment";
import { useNavigate } from "react-router-dom";

type commentProps = {
    postId: number;
    show: boolean;
    handleClose: () => void;

}

export const Comment:FC<commentProps> = ({show,handleClose,postId})=>{
    const navigate = useNavigate();
    const db = useContext(dbContext);
    const existedUser = useContext(userIdContext);
    const [commentForm, setCommentForm] = useState<string>("");

    useEffect(()=>{
        if(db.db.posts.length == 0){
            navigate("/");
        }
    },[])


    function addComment(){
        const newComment: CommentModel = {
            postId: postId,
            id: db.db.comments[db.db.comments.length - 1].id + 1,
            body: commentForm,
            email: db.db.users[db.db.users.findIndex(e=> e.id === existedUser.id)].email,
            name: db.db.users[db.db.users.findIndex(e=> e.id === existedUser.id)].name
        }

        db.db.comments.push(newComment)

        db.setDb({...db.db})
    }

    function  deletComment(id:number) {
        db.db.comments = db.db.comments.filter(e=>e.id !== id);
        
        db.setDb({...db.db})
    }


    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>

            <Modal.Body>
                {
                    db.db.comments.filter((comment:CommentModel)=>comment.postId === postId).map((comment:CommentModel)=>{

                        return (
                            <Alert variant="primary">
                                {comment.body}
                                <ButtonGroup className="d-flex my-2">
                                    <Button  variant="primary" disabled>{comment.email}</Button>
                                    {
                                        existedUser.id > 0  && 
                                            (db.db.users[db.db.users.findIndex(e=>e.id === existedUser.id)].email === comment.email &&
                                            <Button variant="danger" onClick={()=>deletComment(comment.id)}>delet</Button>)
                                    }
                                </ButtonGroup>
                            </Alert>
                        )
                    })
                }
            </Modal.Body>

            {
                existedUser.id > -1 &&(
                    <Modal.Footer>
            
                        <InputGroup >
                            <Form.Control 
                                style={{border:"2px solid grey"}}
                                placeholder="write comment..."
                                value={commentForm}
                                onChange={e=> setCommentForm(e.target.value)}
                            />
                            <Button variant="primary" onClick={addComment}>
                                send
                            </Button>
                        </InputGroup>
                        
                    </Modal.Footer>
                )
            }
        </Modal>
    </>
}