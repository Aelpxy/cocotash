import { useState, useEffect } from 'react';
import Layout from '../../../layouts/Layout';
import ApplicationLayout from '../../../layouts/ApplicationLayout';
import { Stats } from '../../../components/Stats';
import { AnalyticsChart } from '../../../components/AnalyticsChart';
import { ExecuteConsole } from '../../../components/ExecuteConsole';
import { LogsViewer } from '../../../components/LogsViewer';

import { classNames } from '../../../utils/common';

interface Tab {
    name: string;
    href: string;
    current: boolean;
}

const navigation = [
    { name: 'Overview', href: '/@app', current: false },
    { name: 'Databases', href: '/@app/databases', current: true },
    { name: 'Cronjobs', href: '/@app/cronjobs', current: false },
    { name: 'Backups', href: '/@app/backups', current: false },
];

const initialTabNames = ['Metrics', 'Console', 'Data', 'Variables', 'Settings'];

const generateTabs = (tabNames: string[], activeTab: string): Tab[] => {
    return tabNames.map((name) => ({
        name,
        href: '/',
        current: name === activeTab,
    }));
};

interface TabsProps {
    activeTab: string;
    onTabClick: (tabName: string) => void;
}

function Tabs({ activeTab, onTabClick }: TabsProps): JSX.Element {
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select Tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-zinc-600 py-2 pl-3 pr-10 text-base focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                    onChange={(e) => onTabClick(e.target.value)}
                    value={activeTab}
                >
                    {generateTabs(initialTabNames, activeTab).map((tab) => (
                        <option key={tab.name} value={tab.name}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-zinc-800">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {generateTabs(initialTabNames, activeTab).map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => onTabClick(tab.name)}
                                className={classNames(
                                    tab.current
                                        ? 'border-zinc-300 text-zinc-300'
                                        : 'border-transparent text-zinc-500 transition-all duration-300 ease-in-out hover:border-zinc-400 hover:text-zinc-400',
                                    'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default function Database(): JSX.Element {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('activeTab') || initialTabNames[0];
    });

    const handleTabClick = (tabName: string): void => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    return (
        <>
            <Layout>
                <ApplicationLayout navigation={navigation} title="Database">
                    <div className="px-6 pr-6">
                        <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
                        {activeTab === 'Metrics' && (
                            <div>
                                <Stats />
                                <div className="mt-6 rounded-md border border-zinc-900 px-6 py-6">
                                    <h2 className="mb-4 select-none text-2xl font-bold text-zinc-100">
                                        Hardware Usages (1H)
                                    </h2>
                                    <AnalyticsChart />
                                </div>
                            </div>
                        )}
                        {activeTab === 'Console' && (
                            <div>
                                <LogsViewer logs={``} />
                                <ExecuteConsole />
                            </div>
                        )}
                    </div>
                </ApplicationLayout>
            </Layout>
        </>
    );
}
