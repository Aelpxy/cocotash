import React, { useEffect, useRef } from 'react';

interface LogsViewerProps {
    logs: string;
}

const LogsViewer: React.FC<LogsViewerProps> = ({ logs }) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const logLines = logs.split('\n');

    return (
        <div className="mx-auto my-8 overflow-hidden rounded-lg border border-zinc-800 p-6 dark:bg-zinc-950">
            <h2 className="mb-4 select-none text-2xl font-bold text-zinc-100">Logs</h2>
            <div
                ref={logContainerRef}
                className="max-h-96 overflow-auto"
                style={{ scrollBehavior: 'smooth' }}
            >
                <pre className="text-sm text-zinc-300">
                    {logLines.map((line: string, index: number) => (
                        <div key={index} className="mb-1">
                            <code>{line}</code>
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
};

export { LogsViewer };
