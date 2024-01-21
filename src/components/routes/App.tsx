import { FC, useEffect, useState, createContext } from "react";
import { Login } from "./Login";
import { Album } from "../../model/Album";
import { Loadding } from "./Loadding";
import {Register } from "./Register"
import { User } from "../../model/User";
import { Link, Outlet, useHref, useLinkClickHandler, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "../../css/App.css";
import { getObjectOfFetchData } from "../../util/FetchData";
import { dataBase } from "../../model/dataBase";
import { tapeItem } from "../../model/tapeItem";
import { tapeTypes } from "../../model/tapeTypes";
import { useTape } from "../../hooks/useTape";

type GlobalUserLoginStatus = {
    id: number;
    setId: (e:number) => void;   
}

type GlobalDatabase = {
    db: dataBase;
    setDb: (e:dataBase ) => void;
}





export const userIdContext = createContext<GlobalUserLoginStatus>({
        id: -1,
        setId: ()=>{}
    });


export const dbContext = createContext<GlobalDatabase>({
    db:{
        albums: [],
        comments: [],
        photos: [],
        posts: [],
        todos: [],
        users: []
    },
    setDb: ()=>{}
});

export const tapeContext = createContext<[Array<{type: tapeTypes, item: tapeItem}>, (item: {type: tapeTypes, item: tapeItem}) => void]>([[],(item: {type: tapeTypes, item: tapeItem})=>{}]);

export const App: FC = ()=>{


    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [db,setDb] = useState<dataBase>({
        albums: [],
        comments: [],
        photos: [],
        posts: [],
        todos: [],
        users: []
    });
    const [id,setId] = useState<number>(-1);
    const [tape,setTape] = useTape();
    useEffect(()=>{

        (async function (){
            db.albums = (await getObjectOfFetchData()).albums;
            db.comments = (await getObjectOfFetchData()).comments;
            db.photos = (await getObjectOfFetchData()).photos; 
            db.posts = (await getObjectOfFetchData()).posts;
            db.todos = (await getObjectOfFetchData()).todos;
            db.users = (await getObjectOfFetchData()).users;
            setIsLoading(false)
        })()
       
        
        
    },[]);

    useEffect(function () {
        setTape({type: tapeTypes.userCreated, item: "Shanna@melissa.tv"})
        setTape({type: tapeTypes.logedIn, item: "Shanna@melissa.tv"})
        setTape({type: tapeTypes.logedOut, item: "Shanna@melissa.tv"})
        setTape({type: tapeTypes.addPhoto, item: 1})
        setTape({type: tapeTypes.deletPhoto, item: 1})
        setTape({type: tapeTypes.addPost, item: 2})
        setTape({type: tapeTypes.deletPost, item: 2})
    },[])   

    
    function logOut() {
        setTape({type: tapeTypes.logedOut ,item: db.users[db.users.findIndex(e=>e.id === id)].email});
        setId(-1);
        navigate("/");
    }
    



    if(isLoading){
        return <Loadding/>
    }

    return (<>


        <tapeContext.Provider value={[tape,setTape]}>
            <dbContext.Provider value={{db,setDb}}>
                <userIdContext.Provider value={{id,setId}}>
                    
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            
                            <Navbar.Brand>
                                <Link to={"/"} className="nav-link">Main-page</Link>
                            </Navbar.Brand>
                            
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link >
                                    <Link to={"/Blog"} className="nav-link">Blog</Link>
                                </Nav.Link>
                                <Nav.Link >
                                    <Link to={"/Photos"} className="nav-link">Photos</Link>
                                </Nav.Link>
                                <Nav.Link >
                                    <Link to={"/Users"} className="nav-link">Users</Link>
                                </Nav.Link>
                            </Nav>


                            {
                                id < 0 ? (
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="primary">
                                        <Link to={"/Register"} className="nav-link">Register</Link>
                                    </Button>
                                    <Button variant="primary">
                                        <Link to={"/Login"} className="nav-link">Login</Link>
                                    </Button>
                                </ButtonGroup>) : (
                                <ButtonGroup>

                                    <Button variant="info">
                                        <Link to={"/Profile"} className="nav-link">Profile of: {db.users[db.users.findIndex(e=>e.id === id)].email}</Link>
                                    </Button>
                                    <Button variant="danger" onClick={logOut}>Log Out</Button>
                                </ButtonGroup>
                                )     
                            }    
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                        
                    <Outlet/>



                </userIdContext.Provider>
            </dbContext.Provider>
        </tapeContext.Provider>

    </>)
}
export default App;