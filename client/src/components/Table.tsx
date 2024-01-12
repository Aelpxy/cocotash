const statuses = {
    online: 'text-green-400 bg-green-400/10',
    offline: 'text-rose-400 bg-rose-400/10',
};

import { SiPostgresql, SiMariadb, SiMysql, SiMongodb, SiRedis } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { classNames } from '../utils/common';

const databases = [
    {
        database: {
            name: 'test db',
            type: 'postgresql',
        },
        location: 'localhost',
        status: 'online',
        duration: '25s',
        dateTime: '2024-01-23T11:00',
    },
];

export function Table() {
    return (
        <div className="py-10">
            <table className="mt-6 w-full whitespace-nowrap text-left">
                <thead className="border-b border-white/5 text-sm leading-6 text-white">
                    <tr>
                        <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                            Name
                        </th>
                        <th
                            scope="col"
                            className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                        >
                            Region
                        </th>
                        <th
                            scope="col"
                            className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                        >
                            Status
                        </th>

                        <th
                            scope="col"
                            className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                        >
                            Creation Time
                        </th>
                        <th
                            scope="col"
                            className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                        >
                            Creation Date
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {databases.map((db) => (
                        <tr key={db.location}>
                            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                <div className="flex items-center gap-x-4">
                                    {db.database.type === 'postgresql' && (
                                        <>
                                            <SiPostgresql className="h-6 w-6 text-blue-500" />
                                        </>
                                    )}

                                    {db.database.type === 'mysql' && (
                                        <>
                                            <SiMysql className="h-6 w-6 text-yellow-500" />
                                        </>
                                    )}

                                    {db.database.type === 'mariadb' && (
                                        <>
                                            <SiMariadb className="h-6 w-6 text-orange-500" />
                                        </>
                                    )}

                                    {db.database.type === 'redis' && (
                                        <>
                                            <SiRedis className="h-6 w-6 text-red-500" />
                                        </>
                                    )}

                                    {db.database.type === 'mongodb' && (
                                        <>
                                            <SiMongodb className="h-6 w-6 text-green-500" />
                                        </>
                                    )}

                                    <div className="truncate text-sm font-medium leading-6 text-white hover:underline">
                                        <Link to={'/@app/databases/:id'}>{db.database.name}</Link>
                                    </div>
                                </div>
                            </td>
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                <div className="flex gap-x-3">
                                    <div className="rounded-md bg-zinc-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                                        <code>{db.location}</code>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                    <div
                                        className={classNames(
                                            // @ts-expect-error ___
                                            statuses[db.status],
                                            'flex-none rounded-full p-1',
                                        )}
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                                    </div>
                                    <div className="hidden text-white sm:block">{db.status}</div>
                                </div>
                            </td>
                            <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                                {db.duration}
                            </td>
                            <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                                <time dateTime={db.dateTime}>
                                    {new Date(db.dateTime).toLocaleTimeString()}{' '}
                                    {new Date('2023-01-18T12:34').toLocaleDateString()}
                                </time>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
