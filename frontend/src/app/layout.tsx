import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './(component)/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Scanner',
  description: 'One stop solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="main-container"
          style={{
            backgroundColor: 'grey',

            height: '100%',

            minWidth: '944px',
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
