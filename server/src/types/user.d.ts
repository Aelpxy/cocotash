interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

interface IGenerateSessionToken {
    email: string;
    password: string;
}

export { ICreateUser, IGenerateSessionToken };
