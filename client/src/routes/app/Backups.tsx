import Layout from '../../layouts/Layout';
import ApplicationLayout from '../../layouts/ApplicationLayout';

const navigation = [
    { name: 'Overview', href: '/@app', current: false },
    { name: 'Databases', href: '/@app/databases', current: false },
    { name: 'Cronjobs', href: '/@app/cronjobs', current: false },
    { name: 'Backups', href: '/@app/backups', current: true },
];

export default function Backups() {
    return (
        <>
            <Layout>
                <ApplicationLayout navigation={navigation} title="Backups">
                Backups
                </ApplicationLayout>
            </Layout>
        </>
    );
}
