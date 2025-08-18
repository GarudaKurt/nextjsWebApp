import "./globals.css";


export const metadata = {
  title: "Tourism & Rental Services",
  description: "This is my clients projects in progress development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
