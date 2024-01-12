import { useState } from 'react';
import toast from 'react-hot-toast';

const ExecuteConsole: React.FC = () => {
    const [command, setCommand] = useState<string>('');

    const handleExecute = (value: string) => {
        if (!value) {
            toast.error('Nothing was provided to execute!');
            return;
        }

        toast.success(`Executed ${value} in 2 seconds.`);
        return;
    };

    return (
        <div className="container mx-auto my-8 overflow-hidden rounded-lg border border-zinc-800 p-6 dark:bg-zinc-950">
            <h2 className="mb-4 select-none text-2xl font-bold text-zinc-100">Execute Command</h2>
            <div className="flex">
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="mr-2 flex-1 rounded-md border border-zinc-600 bg-[#131313] p-2 py-1.5 pl-3 pr-10 font-mono text-base text-zinc-100 focus:border-zinc-700 focus:outline-none focus:ring-zinc-700 sm:text-sm"
                    placeholder="Start typing..."
                />
                <button
                    onClick={() => handleExecute(command)}
                    className="rounded-md border border-transparent bg-zinc-900 px-2 py-1.5 text-sm font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:border-zinc-500 hover:bg-zinc-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
                >
                    Execute
                </button>
            </div>
        </div>
    );
};

export { ExecuteConsole };
