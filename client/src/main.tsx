import ReactDOM from 'react-dom/client';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Router from './router.tsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <Router />
        <Toaster
            toastOptions={{
                className: 'dark:bg-zinc-800 dark:text-zinc-300 cd-font',
                style: {
                    zIndex: 20,
                },
            }}
            position="bottom-left"
            reverseOrder={false}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <button
                                    className="rounded bg-zinc-100 px-0.5 py-0.5 dark:bg-zinc-700"
                                    onClick={() => toast.dismiss(t.id)}
                                >
                                    <XMarkIcon className="h-4 w-4 text-zinc-800 dark:text-zinc-300" />
                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    </>,
);
