import FadeIn from "@/components/animations/FadeIn";

const stats = [
  { value: "50+",  label: "Artistes accompagnés" },
  { value: "200+", label: "Contenus produits" },
  { value: "15+",  label: "Clips réalisés" },
  { value: "5M+",  label: "Vues générées" },
];

export default function ArtistesStats() {
  return (
    <section className="py-14 bg-bg-dark border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }, i) => (
            <FadeIn key={label} delay={i * 0.1} direction="up">
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl text-gold mb-2 leading-none">
                  {value}
                </p>
                <p className="font-body text-sm text-white/50 uppercase tracking-wider">
                  {label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
