import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterBanner from "@/components/layout/NewsletterBanner";
import PageTransition from "@/components/layout/PageTransition";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";
import ChatWidget from "@/components/chat/ChatWidget";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <NewsletterBanner />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <ChatWidget />
    </>
  );
}
