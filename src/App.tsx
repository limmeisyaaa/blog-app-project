import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "./pages/HomePage";

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
      <HomePage />
      {/* <About />
        <Skills />
        <Portfolio />
        <Experience />
        <Testimonials />
        <Footer /> */}
    </Layout>
  );
}

export default App;
