import toast from "react-hot-toast";

export default function ResetCredentials() {
    return (
        <div className="my-8 border border-zinc-800 bg-zinc-950 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-start sm:justify-between">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-zinc-100">
                            Reset Credentials
                        </h3>
                        <div className="mt-2 max-w-xl text-sm text-zinc-500">
                            <p>
                                Exposed your credentials? No fears just click the "Reset" button and
                                you are good.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                        <button
                            type="button"
                            onClick={() => toast.success("Database credentials were purged and new ones were added.")}
                            className="inline-flex justify-center gap-3
                            rounded-md
                            border border-transparent bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:border-red-500 hover:bg-red-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
