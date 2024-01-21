import { Album } from "./Album"
import { Comment } from "./Comment"
import { Photo } from "./Photo"
import { Post } from "./Post"
import { Todo } from "./Todo"
import { User } from "./User"

export type dataBase = {
    albums: Album[],
    comments: Comment[],
    photos: Photo[],
    posts: Post[],
    todos: Todo[],
    users: User[]
}