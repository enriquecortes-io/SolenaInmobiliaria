import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solena Inmobiliaria',
  description: 'Propiedades seleccionadas en la Costa del Sol',
  themeColor: '#1A0E08',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#1A0E08" />
      </head>
      <body style={{ margin: 0, background: "#1A0E08" }}>{children}</body>
    </html>
  );
}
