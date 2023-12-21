import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateDB: React.FC<IProps> = ({ isOpen, onClose }) => {
    return (
        <Transition.Root appear={isOpen} show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#bdb9b9] bg-opacity-70 backdrop-blur-lg backdrop-filter transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="animate-text relative transform overflow-hidden rounded-xl border border-zinc-300 bg-white text-left shadow-2xl shadow-zinc-300/50 drop-shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="cd-font sm:mt-2">
                                        <Dialog.Title as="h3">
                                            <p className="text-left text-xl font-semibold text-zinc-900">
                                                Create Database
                                            </p>
                                        </Dialog.Title>

                                        <form className="mt-6">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block text-left text-sm font-semibold text-zinc-800"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    autoComplete="text"
                                                    required
                                                    className="mt-0.5 block w-full rounded-md border border-zinc-400 bg-[#f8f7f7] py-2 pl-3 pr-10 text-base text-black focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                                                ></input>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="type"
                                                    className="mt-4 block text-left text-sm font-semibold text-zinc-800"
                                                >
                                                    Type
                                                </label>
                                                <select
                                                    id="type"
                                                    name="type"
                                                    autoComplete="text"
                                                    required
                                                    className="mt-0.5 block w-full rounded-md border border-zinc-400 bg-[#f8f7f7] py-2 pl-3 pr-10 text-base text-black focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                                                >
                                                    <option disabled value="">
                                                        Select an option
                                                    </option>

                                                    <option value={'POSTGRESQL'}>PostgreSQL</option>
                                                    <option value={'REDIS'}>Redis</option>
                                                </select>
                                            </div>

                                            <div className="mt-5 sm:mt-6">
                                                <>
                                                    <button
                                                        type="submit"
                                                        className="
                                                        
                                                        flex w-full items-center justify-center gap-3 rounded-md border border-zinc-500 bg-zinc-900 px-1 py-1.5
                                                         text-base text-white shadow-md shadow-zinc-100 hover:bg-zinc-950 hover:shadow-lg hover:shadow-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                    >
                                                        Deploy Database
                                                    </button>
                                                </>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export { CreateDB };
