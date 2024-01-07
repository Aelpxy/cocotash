import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LogIn from './routes/auth/LogIn';
import Register from './routes/auth/Register';

import App from './routes/App';
import NotFound from './routes/NotFound';

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/@auth/login" element={<LogIn />} />
                    <Route path="/@auth/register" element={<Register />} />

                    <Route path="/@app" element={<App />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;
