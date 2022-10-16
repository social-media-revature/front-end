import { User } from "./User.model";
import { Post } from "./Post.model";

export interface Group{
    groupID: number,
    adminID: any,
    groupName: string,
    groupDescription: string,
    groupImageUrl: string,
    groupMembers: User[],
}