import "./globals.css";


export const metadata = {
  title: "Blog2Tweet: Automating Blog Discovery and Tweet Creation",
  description: "Blog2Tweet simplifies the task of discovering blog content on Dev.to and converting it into tweet-ready posts using AI. Effortlessly browse, select, and share trending topics with your followers on Twitter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
