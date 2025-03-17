import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ModernNavigation from "@/components/ModernNavigation";
import ChatBot from "@/components/ChatBot";
import Background from "@/components/Background";

const Index = () => {
  return (
    <Background>
      <div className="min-h-screen text-foreground overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
        <ScrollToTop />
        <ModernNavigation />
        <ChatBot />
      </div>
    </Background>
  );
};

export default Index;
