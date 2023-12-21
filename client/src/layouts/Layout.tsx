import { useState } from 'react';

import { CreateDB } from '../components/modals/CreateDB';

const Layout = (props: { children: any }) => {
    const [createDB, setCreateDB] = useState(false);

    return (
        <>
            <div className="px-36 py-16">
                <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900">Cocotash</h3>
                    <div className="mt-3 flex sm:ml-4 sm:mt-0">
                        <button
                            type="button"
                            onClick={() => setCreateDB(true)}
                            className="ml-2 inline-flex items-center rounded-md border border-zinc-500 bg-zinc-900 px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
                        >
                            Create DB
                        </button>
                    </div>
                </div>
                {props.children}
            </div>
            {createDB && <CreateDB isOpen={createDB} onClose={() => setCreateDB(false)} />}
        </>
    );
};

export default Layout;
