import User from "./User"
import { Post } from "./Post.model"
import { Group } from "./Group.model"

export default class GroupPost {
    id: number
    groupID: number
    text: string
    imageUrl: string
    author: User
    comments: Post[]

    constructor (id: number, groupID: number, text: string, imageUrl: string, author: User, comments: Post[]) {
        this.id = id
        this.groupID = groupID
        this.text = text
        this.imageUrl = imageUrl
        this.author = author
        this.comments = comments
    }

}
