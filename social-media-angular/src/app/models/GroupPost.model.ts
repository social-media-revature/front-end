import User from "./User"
import { Post } from "./Post.model"
import { Group } from "./Group.model"

export interface GroupPost {
    id: number
    groupID: number
    text: string
    imageUrl: string
    author: User
    comments: Post[]

}
