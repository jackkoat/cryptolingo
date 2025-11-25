import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WalletProvider } from '@/components/providers/WalletProvider';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingXPBadge } from '@/components/layout/FloatingXPBadge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoLingo - Learn Crypto the Fun Way',
  description: 'Master blockchain and cryptocurrency concepts through interactive, gamified lessons',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <Navbar />
          <FloatingXPBadge />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
