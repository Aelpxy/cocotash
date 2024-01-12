import React, { Fragment } from 'react';

import Overlay from './Overlay';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateDB: React.FC<IProps> = ({ isOpen, onClose }) => {
    return (
        <Overlay isOpen={isOpen} onClose={onClose} Fragment={Fragment} title="Create Database">
            <form className="mt-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-left text-xs font-semibold text-zinc-300"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="text"
                        required
                        className="mt-1 block w-full rounded-md border border-zinc-600 bg-[#131313] py-1.5 pl-3 pr-10 text-base text-zinc-100 focus:border-zinc-700 focus:outline-none focus:ring-zinc-700 sm:text-sm"
                    ></input>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mt-3 block text-left text-xs font-semibold text-zinc-300"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="text"
                        required
                        className="mt-1 block w-full rounded-md border border-zinc-600 bg-[#131313] py-1.5 pl-3 pr-10 text-base text-zinc-100 focus:border-zinc-700 focus:outline-none focus:ring-zinc-700 sm:text-sm"
                    ></input>
                </div>

                <div>
                    <label
                        htmlFor="type"
                        className="mt-3 block text-left text-xs font-semibold text-zinc-300"
                    >
                        Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        autoComplete="text"
                        required
                        className="mt-1 block w-full rounded-md border border-zinc-600 bg-[#131313] py-1.5 pl-3 pr-10 text-base text-zinc-100 focus:border-zinc-700 focus:outline-none focus:ring-zinc-700 sm:text-sm"
                    >
                        <option disabled value="">
                            Select an option
                        </option>

                        <option value={'POSTGRESQL'}>PostgreSQL</option>
                        <option value={'MYSQL'}>MySQL</option>
                        <option value={'MARIADB'}>MariaDB</option>
                        <option value={'MONGODB'}>MongoDB</option>
                        <option value={'REDIS'}>Redis</option>
                    </select>
                </div>

                <div className="mt-5 sm:mt-6">
                    <>
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-3
                            rounded-md
                            border border-transparent bg-zinc-900 px-2 py-1.5 text-sm font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:border-zinc-500 hover:bg-zinc-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
                        >
                            Create Database
                        </button>
                    </>
                </div>
            </form>
        </Overlay>
    );
};

export { CreateDB };
