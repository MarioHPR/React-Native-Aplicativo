interface Response {
    token: string,
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response> {
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'fownoefdmowexmsaklcn2131sdad',
                user: {
                    name: 'teste',
                    email: 'ewwewdsc@fdsffs'
                },
            });
        }, 2000);
    });
}