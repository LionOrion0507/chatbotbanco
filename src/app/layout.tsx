import "./globals.css";
import Image from 'next/image';

export const metadata = {
  title: "BanBajío | Tu Banco de Confianza",
  icons: {
    icon: "/banbajio-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bodyMargin">
        <Image src='/imagenFondo.png' alt="background image" fill />
        {children}
      </body>
    </html>
  );
}
