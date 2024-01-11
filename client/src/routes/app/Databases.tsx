import Layout from '../../layouts/Layout';
import ApplicationLayout from '../../layouts/ApplicationLayout';

const navigation = [
    { name: 'Overview', href: '/@app', current: false },
    { name: 'Databases', href: '/@app/databases', current: true },
    { name: 'Cronjobs', href: '/@app/cronjobs', current: false },
    { name: 'Backups', href: '/@app/backups', current: false },
];

export default function Databases() {
    return (
        <>
            <Layout>
                <ApplicationLayout navigation={navigation} title="Databases">
                    Databases
                </ApplicationLayout>
            </Layout>
        </>
    );
}
