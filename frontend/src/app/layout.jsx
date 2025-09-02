import "./globals.css";
import Header from "./components/Header/page"; // adjust path if needed
import Footer from "./components/Footer/page"; // adjust path if needed
//import "./index.html"

export const metadata = {
  title: "BugHead",
  description: "Bug reporting made simple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Header will appear on every page */}
        <Header />
        
        {/* Page content */}
        <main>{children}</main>
        <Footer />

      </body>
    </html>
  );
}
