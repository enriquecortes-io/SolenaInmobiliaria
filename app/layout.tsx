import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solena Inmobiliaria',
  description: 'Propiedades seleccionadas en la Costa del Sol',
  themeColor: '#1A0E08',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <head>
        <meta name="theme-color" content="#1A0E08" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
