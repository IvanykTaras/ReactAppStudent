import { Post } from "../model/Post";
import { User } from "../model/User";

async function fetchData(resource: string){
    const API = "https://jsonplaceholder.typicode.com/";
    const response = await fetch(API + resource);
    const data = await response.json();
    return data
}

export async  function getObjectOfFetchData(){
    const albums = await fetchData("posts");
    const comments = await fetchData("comments");
    const photos = await fetchData("photos");
    const posts = await fetchData("posts");
    const todos = await fetchData("todos");
    const users = await fetchData("users");


    //set password for all users
    users.forEach((e:User) => {
        e.password = "1234" 
        e.photos = [1,2,3,4,5,6,7,8,9,10];
        e.posts = [1,2,3,4,5,6,7,8,9,10];
    });
    
    posts.forEach((e: Post) => {
        e.image = "https://www.pixelstalk.net/wp-content/uploads/2016/05/Airplane-HD-Wallpapers-Free-620x388.jpg";
    });

    return {
        albums,
        comments,
        photos,
        posts,
        todos,
        users
    }
    
    
}