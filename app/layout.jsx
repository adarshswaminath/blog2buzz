import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import "./globals.css";


export const metadata = {
  title: "Blog2Buzz: Automating Blog Discovery and Tweet Creation",
  description: "Blog2Buzz simplifies the task of discovering blog content on Dev.to and converting it into tweet-ready posts using AI. Effortlessly browse, select, and share trending topics with your followers on Twitter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
