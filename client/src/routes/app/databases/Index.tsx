import { useState } from 'react';

import Layout from '../../../layouts/Layout';
import ApplicationLayout from '../../../layouts/ApplicationLayout';

import { Heading } from '../../../components/Heading';
import { Table } from '../../../components/Table';

import { CreateDB } from '../../../components/modals/CreateDB';

const navigation = [
    { name: 'Overview', href: '/@app', current: false },
    { name: 'Databases', href: '/@app/databases', current: true },
    { name: 'Cronjobs', href: '/@app/cronjobs', current: false },
    { name: 'Backups', href: '/@app/backups', current: false },
];

export default function Databases() {
    const [createDatabase, setCreateDatabase] = useState(false);

    return (
        <>
            <Layout>
                <ApplicationLayout navigation={navigation} title="Databases">
                    <Heading
                        heading="Current Databases"
                        text="Create Database"
                        onClick={() => setCreateDatabase(true)}
                    />
                    <Table />
                </ApplicationLayout>
            </Layout>
            {createDatabase && (
                <>
                    <CreateDB isOpen={true} onClose={() => setCreateDatabase(false)} />
                </>
            )}
        </>
    );
}
