import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicePage";
import { TeamsPage } from "./pages/TeamsPage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { CreateBlogPage } from "./pages/CreateBlogPage";
import { Route, Routes } from "react-router";
import { CatalougePage } from "./pages/CatalougePage";
import { ContactPage } from "./pages/ContactPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/catalouge" element={<CatalougePage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/create-blog" element={<CreateBlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
  );
}

export default App;
