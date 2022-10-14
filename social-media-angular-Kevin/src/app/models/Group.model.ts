import { User } from "./User.model";
import { Post } from "./Post.model";

export interface Group{
    groupID: number,
    adminID: any,
    groupName: string,
    groupDescription: string,
    groupMembers: User[],
}