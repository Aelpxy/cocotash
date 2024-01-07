import { ReactNode } from 'react';

const AuthLayout = (props: { children: ReactNode }) => {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-white">
                        <code>~/ventus</code>
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{props.children}</div>
            </div>
        </>
    );
};

export default AuthLayout;
