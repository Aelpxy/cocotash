import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './routes/App';
import NotFound from './routes/NotFound';

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;
