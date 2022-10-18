import User from "./User";

export interface Profile{
        id: number,
        text: string,
        imageUrl: string,
        displayEmail: boolean,
        birthday: string,
        displayBirthday: boolean,
        displayAge: boolean,
        user: User
}