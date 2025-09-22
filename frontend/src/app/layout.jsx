import "./globals.css";
import Header from "../components/Navbar"; // adjust path if needed
import Footer from "../components/Footer"; // adjust path if needed
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
        
        
        {/* Page content */}
        <main>{children}</main>
        <Footer />

      </body>
    </html>
  );
}
