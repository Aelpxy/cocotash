import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LogIn from './routes/auth/LogIn';
import Register from './routes/auth/Register';

import Overview from './routes/app/Overview';
import Databases from './routes/app/Databases';
import Cronjobs from './routes/app/Cronjobs';
import Backups from './routes/app/Backups';

import NotFound from './routes/NotFound';

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/@auth/login" element={<LogIn />} />
                    <Route path="/@auth/register" element={<Register />} />

                    <Route path="/@app" element={<Overview />} />
                    <Route path="/@app/databases" element={<Databases />} />
                    <Route path="/@app/cronjobs" element={<Cronjobs />} />
                    <Route path="/@app/backups" element={<Backups />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;
