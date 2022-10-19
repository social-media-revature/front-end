import User from "./User"

export interface Post {
    id: number
    text: string
    imageUrl: string
    author: User
    comments: Post[]

}