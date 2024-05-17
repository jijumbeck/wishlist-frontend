
export interface UserInfo {
    id: string,
    email: string,
    login: string,

    name?: string,
    lastName?: string,
    birthdate?: string,
    imageURL?: string
}

export interface ChangeUserInfoDTO {
    id: string,

    email?: string;

    login?: string;

    name?: string;

    lastName?: string;

    birthdate?: string;
}