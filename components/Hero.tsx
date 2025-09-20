import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12 w-full max-w-4xl">
          <Image
            src="/hero-text.png"
            alt="Technovation Society - Collaborate. Innovate. Elevate."
            width={800}
            height={400}
            className="w-full h-auto max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mx-auto"
            priority
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
          <Button text="Get to Know Us" />
          <Button text="Join Us" />
        </div>
      </div>
    </section>
  );
}
