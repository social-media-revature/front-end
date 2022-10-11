import User from "./User";

export interface Profile{
        id: number,
        text: string,
        image_url: string,
        user: User
}