import React from 'react';
import styles from './styles.module.css';
import Head from 'next/head';

const App = () => {
    return (
        <>
        <Head>
        <link
        rel="icon"
        href="https://new-cnc-next.vercel.app/favicon.ico"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        href="https://new-cnc-next.vercel.app/favicon.ico"
      />
      <title>{"Security Interupted"}</title>
        </Head>
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.icon}>&#9888;</div>
                <div className={styles.title}>Security Layer Activated</div>
                <div className={styles.message}>Suspicious Activity Detected</div>
                <div className={styles.ipInfo}>IP Captured</div>
            </div>
        </div>
            </>
    );
};

export default App;