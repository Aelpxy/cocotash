import Layout from '../layouts/Layout';
import ApplicationLayout from '../layouts/ApplicationLayout';

const navigation = [
    { name: 'Overview', href: '/@app', current: true },
    { name: 'Databases', href: '/@app/databases', current: false },
    { name: 'Cronjobs', href: '/@app/cronjobs', current: false },
    { name: 'Backups', href: '/@app/backups', current: false },
];

export default function App() {
    return (
        <>
            <Layout>
                <ApplicationLayout navigation={navigation} title="Overview">
                    Overview
                </ApplicationLayout>
            </Layout>
        </>
    );
}
