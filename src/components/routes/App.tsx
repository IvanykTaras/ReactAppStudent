import { FC, useEffect, useState } from "react";
import { Login } from "./Login";
import { db } from "../../db";
import { Album } from "../../model/Album";
import { Loadding } from "./Loadding";
import {Register } from "./Register"
import { User } from "../../model/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";




export const App: FC = ()=>{


    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{

        

        async function fetchData(resource: string){
            const API = "https://jsonplaceholder.typicode.com/";
            const response = await fetch(API + resource);
            const data = await response.json();
            return data
        }

        (async function (){
            db.albums = await fetchData("posts");
            db.comments = await fetchData("comments");
            db.photos = await fetchData("photos");
            db.posts = await fetchData("posts");
            db.todos = await fetchData("todos");
            db.users = await fetchData("users");


            //set password for all users
            db.users.forEach((e:User) => {
                e.password = "1234" 
            }); 
            
            
        })()
       
        setTimeout(()=>setIsLoading(false),100)
        
    },[]);
    
    


    if(isLoading){
        return <Loadding/>
    }

    return (<>
        <Login/>
        
    </>)
}
export default App;