import NewsletterForm from "@/components/newsletter/NewsletterForm";

export default function NewsletterBanner() {
  return (
    <section style={{ background: "#0C0B09" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(200,168,75,0.10)", border: "1px solid rgba(200,168,75,0.22)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-gold">Newsletter</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Restez dans la lumière
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Conseils marketing, tendances digitales et ressources exclusives pour artistes, entrepreneurs et personnalités au Sénégal — dans votre boîte mail chaque semaine.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
