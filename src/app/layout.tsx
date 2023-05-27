'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/navigation';
import { Layout, theme } from 'antd';

import styles from './layout.module.scss';
import '../styles/theme.scss';
import { ProvideAppContext } from './contexts/AppContext';

const { Content } = Layout;

const RootLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Sans:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
                <title>Block-Vote</title>
            </head>
            <body>
                {/* Added app context provider here */}
                <ProvideAppContext>
                    <Layout className="layout">
                        {/* <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={new Array(3).fill(null).map((_, index) => {
                                const key = index + 1;
                                return {
                                    key,
                                    label: `nav ${key}`,
                                };
                            })}
                        />
                    </Header> */}
                        <Content style={{ background: 'white' }}>
                            {/* <Breadcrumb style={{ 'margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                            <div>
                                <QueryClientProvider client={queryClient}>
                                    <main className={styles.site}>
                                        <div className={styles.siteContent}>{children}</div>
                                    </main>
                                </QueryClientProvider>{' '}
                            </div>
                            {/* <Button>
                            <Link href="/orders">English</Link>
                        </Button> */}
                        </Content>
                    </Layout>
                </ProvideAppContext>
            </body>
        </html>
    );
};

export default RootLayout;
