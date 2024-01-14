import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { CpuChipIcon, ServerStackIcon, WifiIcon } from '@heroicons/react/24/outline';
import { classNames } from '../utils/common';

const stats = [
    {
        id: 1,
        name: 'CPU Usage',
        stat: '17.1%',
        icon: CpuChipIcon,
        change: '7%',
        changeType: 'increase',
    },
    {
        id: 2,
        name: 'RAM Usage',
        stat: '58.16%',
        icon: ServerStackIcon,
        change: '95.4%',
        changeType: 'decrease',
    },
    {
        id: 3,
        name: 'Network Usage',
        stat: '1.9MB/17MB',
        icon: WifiIcon,
        change: '3.2%',
        changeType: 'decrease',
    },
];

export function Stats() {
    return (
        <div className="my-8 mb-10">
            <dl className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="relative overflow-hidden rounded-lg border border-zinc-800 px-4 pb-6 pt-5 shadow sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className="absolute rounded-md border border-zinc-800 bg-zinc-900/50 p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-zinc-500">
                                {item.name}
                            </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline ">
                            <p className="text-2xl font-semibold text-zinc-300">{item.stat}</p>
                            <p
                                className={classNames(
                                    item.changeType === 'increase'
                                        ? 'text-green-600'
                                        : 'text-red-600',
                                    'ml-2 flex items-baseline text-sm font-semibold',
                                )}
                            >
                                <div className="mt-0.5 flex items-center rounded-md border border-zinc-800 px-2 py-1">
                                    {item.changeType === 'increase' ? (
                                        <ArrowUpIcon
                                            className="hot-icon h-5 w-5 flex-shrink-0 self-center text-green-500"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ArrowDownIcon
                                            className="hot-icon h-5 w-5 flex-shrink-0 self-center text-red-500"
                                            aria-hidden="true"
                                        />
                                    )}

                                    <div className="">
                                        <span className="sr-only">
                                            {' '}
                                            {item.changeType === 'increase'
                                                ? 'Increased'
                                                : 'Decreased'}{' '}
                                            by{' '}
                                        </span>
                                        {item.change}
                                    </div>
                                </div>
                            </p>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
