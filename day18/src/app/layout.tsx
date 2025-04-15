import style from "./layout.module.css";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>ONEBITE CINEMA</Link>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
