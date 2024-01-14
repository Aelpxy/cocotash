interface Props {
    heading: string;
    onClick: () => void;
    text: string;
}

const Heading = (props: Props) => {
    return (
        <>
            <div className="border-b border-zinc-900 px-6 pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold leading-6 text-zinc-300">{props.heading}</h3>
                <div className="mt-3 sm:ml-4 sm:mt-0">
                    <button
                        onClick={props.onClick}
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:border-zinc-500 hover:bg-zinc-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
                    >
                        {props.text}
                    </button>
                </div>
            </div>
        </>
    );
};

export { Heading };
