import { Footer } from '../components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Formula 1 Drivers</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
      <Footer />
    </html>
  );
}
