export default function Contact() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-blue-lighter to-[#072777] rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Vignette overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-radial from-transparent via-blue-lighter/20 to-blue-dark/40"></div>

          <div className="relative z-10 text-center text-white">
            {/* Ready to Get Started? */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-seasons mb-6">
              Ready to <span className="text-yellow">Get Started?</span>
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg font-garet mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience transforming bold ideas into impactful, world-changing solutions together with Technovation Society.
              Ready to G
            </p>

            {/* Join Us Button */}
            <button className="glassglow bg-blue-dark text-white hover:text-yellow font-seasons text-lg md:text-xl px-12 py-6 rounded-xl transition-all duration-300 hover:scale-105 border-2 border-white w-full max-w-xs">
              Join Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}