// app/layout.tsx
import './globals.css';
import Header from '../components/Header/Header';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <header>
        <Header />
      </header>
      <body>{children}</body>
    </html>
  );
}
