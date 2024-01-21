import { FC, useContext, useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Card, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import { Tabs,TabPanel, TabList, Tab } from "react-tabs";
import { Toaster, toast } from 'alert';
import "../../css/Profile.css";
import { dbContext, tapeContext, userIdContext } from "./App";
import { User } from "../../model/User";
import { Photo } from "../../model/Photo";
import { useNavigate } from "react-router-dom";
import { Console } from "console";
import { Post } from "../../model/Post";
import { Comment } from "../common/Comment";
import { tapeTypes } from "../../model/tapeTypes";


type PostForm = {
    image: string;
    title: string;
    body: string;
}

type EditUserForm = {
    name: string;
    userName: string; 
    editName: boolean;
    editUserName: boolean   
}


export const Profile: FC = ()=>{

    const navigate = useNavigate()
    const existedUser = useContext(userIdContext);
    const db = useContext(dbContext);
    const [tape, setTape] = useContext(tapeContext)
    const [addPhotoForm, setAddPhotoForm] = useState<string>("https://www.pixelstalk.net/wp-content/uploads/2016/05/Airplane-HD-Wallpapers-Free-620x388.jpg");
    const [addPostForm, setAddPostForm] = useState<PostForm>({
        image: "",
        title: "",
        body: ""
    });
    
    const userData: User = db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)]; 
    
    const [editUser, setEditUser] = useState<EditUserForm>({
        name: db.db.users[db.db.users.findIndex(e=>e.id === userData.id)].name,
        userName: db.db.users[db.db.users.findIndex(e=>e.id === userData.id)].username,
        editName: false,
        editUserName: false
    });
    const [show, setShow] = useState<boolean>(false);
    const [idOfPostForComments, setIdOfPostForComments] = useState<number>(-1);
   
    useEffect(()=>{
        if(existedUser.id == -1){
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


    function addPhoto(url:string){
        
        const newPhoto: Photo = {
            albumId: existedUser.id,
            id: db.db.photos[db.db.photos.length-1].id + 1,
            thumbnailUrl: "",
            title: "some title",
            url: addPhotoForm
        }

        db.db.photos.push(newPhoto);
        db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].photos.push(newPhoto.id)

        db.setDb({
            ...db.db
        });

        toast("Images is added");
        setTape({type: tapeTypes.addPhoto, item: newPhoto.id})
        console.log(newPhoto)
    }

    function deletPhoto(id: number){
        
        db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].photos = db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].photos.filter( e=> e !== id);
        
        db.setDb({
            ...db.db,
            users: db.db.users
        })

        setTape({type: tapeTypes.deletPhoto, item: id})

        

    }


    function addPost(post:PostForm){
        console.log(post)

        const newPost: Post = {
            userId: userData.id,
            id: db.db.posts[db.db.posts.length-1].id + 1,
            title: post.title,
            body: post.body,
            image: post.image
        }

        db.db.posts.push(newPost);
        db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].posts.push(newPost.id)

        db.setDb({
            ...db.db
        });

        setTape({type: tapeTypes.addPost, item: newPost.id})

        toast("Post is added");
        console.log(newPost)
    }

    function deletPost(id: number){
        
        db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].posts = db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].posts.filter( e=> e !== id);
        
        db.setDb({
            ...db.db,
            users: db.db.users
        })

        setTape({type: tapeTypes.deletPost, item: id})
        console.log(db.db.users[existedUser.id-1])

    }

    function saveEditDataOfUser(user:EditUserForm){

        setEditUser({
            ...editUser,
            editName: false,
            editUserName: false 
        })
        
        db.db.users[db.db.users.findIndex(e=>e.id === userData.id)].name = user.name
        db.db.users[db.db.users.findIndex(e=>e.id === userData.id)].username = user.userName

        db.setDb({...db.db})
        toast("data is success edit!")
    }


    if(userData){
        return <>

        <h1 className="p-5">{userData.email}</h1>
        <Table className="w-75 mx-auto border border-dark" striped>
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
                <td>{userData.id}</td>

                {editUser.editName ? (
                    <td>
                        <InputGroup>
                            <Button onClick={()=>saveEditDataOfUser(editUser)} variant="success">save</Button>
                            <Form.Control
                            placeholder="name"
                            value={editUser.name}
                            onChange={e=>setEditUser({...editUser, name: e.target.value})}
                            />
                        </InputGroup>
                    </td>
                ): <td onClick={()=>setEditUser({...editUser, editName: true })}>{userData.name}</td>}
                
                {editUser.editUserName ? (
                    <td>
                        <InputGroup>
                            <Button onClick={()=>saveEditDataOfUser(editUser)} variant="success">save</Button>
                            <Form.Control
                            placeholder="userName"
                            value={editUser.userName}
                            onChange={e=>setEditUser({...editUser, userName: e.target.value})}
                            />
                        </InputGroup>
                    </td>): <td onClick={()=>setEditUser({...editUser, editUserName: true })}>{userData.username}</td> 
                }
                
                

                <td>{userData.email}</td>
                
                </tr>
            </tbody>
        </Table>







        <Comment show={show} handleClose={hideComments} postId={idOfPostForComments} />
        <div className="tabs-window">
            <Tabs className="w-100">
                <TabList className="btn-group d-flex m-3">
                    <Tab className="btn btn-primary">My Photos</Tab>
                    <Tab className="btn btn-primary">Add Photo</Tab>
                    <Tab className="btn btn-primary">My Posts</Tab>
                    <Tab className="btn btn-primary">Add Post</Tab>
                </TabList>

                <TabPanel>

                    <Row className="justify-centerd-flex justify-content-center m-2">
                        {
                            db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].photos.length === 0 ? <Alert style={{maxWidth:"500px", textAlign: "center"}} variant="info">
                            This tab of images is empty
                          </Alert> : (
                                
                                db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].photos.map(id=>{
                                    const photo: Photo = db.db.photos[db.db.photos.findIndex(e=>e.id == id)];
                                    return (
                                    <Col sm={2} className="mt-4" key={id}>
                                        <Card>
                                            <Card.Img variant="top" src={photo.url} />
                                            <Card.Footer className="d-flex flex-column">
                                                <small className="text-muted">id: {photo.id} / album id: {photo.albumId}</small>
                                                <Button variant="danger" onClick={()=>deletPhoto(photo.id)}>delet</Button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                )})
                            )
                        }
                    </Row>

                </TabPanel>

                <TabPanel> 
                    <Form style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <Toaster />
                        <Form.Group >
                            <Form.Label style={{width: "100%", textAlign:"center"}}>
                                <img src={addPhotoForm} className="show_image" alt="" />
                            </Form.Label>
                            <Form.Control style={{border:"2px solid blue",margin:"1rem auto", maxWidth: "700px",}} onChange={(e)=>setAddPhotoForm(e.target.value)}  value={addPhotoForm}/>
                        </Form.Group>
                        <Button onClick={()=>addPhoto(addPhotoForm)} style={{width: "200px", margin:"1rem auto"}} variant="success">Add photo album</Button>
                    </Form>
                </TabPanel>

                <TabPanel>
                    <Container>
                    {
                        db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].posts.length === 0 ? <Alert style={{maxWidth:"500px", textAlign: "center", margin: "0 auto"}} variant="info">
                        This tab of posts is empty</Alert> : 
                        db.db.users[db.db.users.findIndex( e=> e.id === existedUser.id)].posts.reverse().map(id=>{
                            const post: Post = db.db.posts[db.db.posts.findIndex(e=>e.id == id)];
                            return(
                            <Card key={id} className="mb-2">
                                <Card.Img style={{maxHeight:"200px", width: "100%"}} variant="top" src={post.image} />
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                        {post.body}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    User email: <Button variant="info">{userData.email}</Button>
                                    <Button  onClick={()=>showComments(post.id)} style={{marginLeft: "1rem"}} variant="secondary">Comments</Button>
                                </Card.Footer>
                                <Button onClick={()=>deletPost(post.id)} variant="danger">delet</Button>
                            </Card>)
                        })


                    }
                    </Container>

                    

                </TabPanel>

                <TabPanel>
                    <Form style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <Toaster />
                        <Form.Group >
                            <Form.Label style={{width: "100%", textAlign:"center"}}>
                                <img src={addPostForm.image} className="show_image" alt="" />
                            </Form.Label>
                        
                            <InputGroup  className="mb-3"  style={{border:"2px solid blue",margin:"1rem auto", maxWidth: "700px",}}>
                                <InputGroup.Text id="basic-addon1">Image url</InputGroup.Text>
                                <Form.Control
                                
                                placeholder="Image url"
                                value={addPostForm.image}
                                onChange={(e)=>setAddPostForm({ ...addPostForm, image: e.target.value})}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3"  style={{border:"2px solid blue",margin:"1rem auto", maxWidth: "700px",}}>
                                <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                                <Form.Control
                                placeholder="Title"
                                value={addPostForm.title}
                                onChange={(e)=>setAddPostForm({ ...addPostForm, title: e.target.value})}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3"  style={{border:"2px solid blue",margin:"1rem auto", maxWidth: "700px",}}>
                                <InputGroup.Text id="basic-addon1">Body text</InputGroup.Text>
                                <Form.Control
                                placeholder="Body"
                                value={addPostForm.body}
                                onChange={(e)=>setAddPostForm({ ...addPostForm, body: e.target.value})}
                                />
                            </InputGroup>

                        </Form.Group>
                        <Button onClick={()=>addPost(addPostForm)} style={{width: "200px", margin:"1rem auto"}} variant="success">Add post</Button>
                    </Form>
                </TabPanel>
            </Tabs>
        </div>
    </> 
    }

    return <></>
}
