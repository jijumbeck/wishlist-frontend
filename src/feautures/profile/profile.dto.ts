
export interface UserInfo {
    id: string,
    email: string,
    login: string,

    name?: string,
    lastName?: string,
    birthdate?: Date,
    imageURL?: string
}

export interface ChangeUserInfoDTO {
    id: string,

    email?: string;

    login?: string;

    name?: string;

    lastName?: string;

    birthdate?: Date;
}