'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/navigation';

import styles from './layout.module.scss';
import '../styles/theme.scss';
import Button from '../components/Button';

// eslint-disable-next-line no-underscore-dangle
const MARKETPLACE = process.env._MARKETPLACE;

const RootLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    // Example of using react-query as a data provider
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                    },
                },
            }),
    );

    const router = useRouter();

    return (
        <html lang="en" dir="ltr">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Sans:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <main className={styles.site}>
                        <div className={styles.siteContent}>{children}</div>
                        <footer>
                            &copy; {MARKETPLACE} {new Date().getFullYear()}. All rights reserved
                        </footer>
                    </main>
                </QueryClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
