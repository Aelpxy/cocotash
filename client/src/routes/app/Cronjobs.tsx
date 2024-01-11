import Layout from '../../layouts/Layout';
import ApplicationLayout from '../../layouts/ApplicationLayout';

const navigation = [
    { name: 'Overview', href: '/@app', current: false },
    { name: 'Databases', href: '/@app/databases', current: false },
    { name: 'Cronjobs', href: '/@app/cronjobs', current: true },
    { name: 'Backups', href: '/@app/backups', current: false },
];

export default function Cronjobs() {
    return (
        <>
            <Layout>
                <ApplicationLayout navigation={navigation} title="Cronjobs">
                Cronjobs
                </ApplicationLayout>
            </Layout>
        </>
    );
}
