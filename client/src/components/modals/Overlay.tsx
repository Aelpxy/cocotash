import { Dialog, Transition } from '@headlessui/react';

interface IProps {
    Fragment: React.FC;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Overlay(props: IProps) {
    const { Fragment, isOpen, onClose } = props;

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
                    <div className="fixed inset-0 bg-zinc-950 bg-opacity-50 backdrop-blur-lg backdrop-filter transition-opacity" />
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 px-8 py-8 text-left transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 ">
                                <div>
                                    <div className="cd-font sm:mt-2">
                                        <Dialog.Title as="h3">
                                            <p className="text-left text-xl font-semibold text-zinc-300">
                                                {props.title}
                                            </p>
                                        </Dialog.Title>
                                    </div>
                                    {props.children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
