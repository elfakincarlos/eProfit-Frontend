import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'eProfit',
  description: 'Controle sus finanzas. Registre gastos e ingresos para visualizar la rentabilidad de su negocio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
        "font-body antialiased bg-background text-foreground min-h-screen flex flex-col"
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
