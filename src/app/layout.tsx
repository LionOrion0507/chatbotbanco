import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bodyMargin">
        <img src="./imagenFondo.png" className="bgImg" alt="background image" />
        {children}
      </body>
    </html>
  );
}
