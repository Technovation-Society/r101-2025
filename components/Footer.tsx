import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-light to-blue-dark py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* TECHSOC Logo */}
        <div className="mb-6">
          <Image
            src="/footer/TECHSOC_text.png"
            alt="Technovation Society"
            width={0}
            height={0}
            sizes="100vw"
            className="mx-auto h-auto w-auto max-w-[250px] sm:max-w-[350px] md:max-w-[400px]"
          />
        </div>

        {/* Connect with us */}
        <div className="mb-6">
          <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold mb-4">Connect with us</h3>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-6">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/footer/facebook_icon.png"
                alt="Facebook"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto max-w-[20px] sm:max-w-[24px] md:max-w-[28px]"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/footer/instagram_icon.png"
                alt="Instagram"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto max-w-[20px] sm:max-w-[24px] md:max-w-[28px]"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/footer/linkedin_icon.png"
                alt="LinkedIn"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto max-w-[20px] sm:max-w-[24px] md:max-w-[28px]"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/footer/tiktok_icon.png"
                alt="TikTok"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto max-w-[20px] sm:max-w-[24px] md:max-w-[28px]"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/footer/email_icon.png"
                alt="Email"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto max-w-[20px] sm:max-w-[24px] md:max-w-[28px]"
              />
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <p className="text-white text-xs sm:text-sm leading-relaxed italic text-left max-w-md mx-auto">
            TOMASInno Center, G/F, Frassati Building,<br />
            University of Santo Tomas, España, Manila, Philippines
          </p>
        </div>

        {/* Copyright */}
        <div className="flex justify-center items-center gap-2 text-white">
          <Image
            src="/footer/copyright_icon.png"
            alt="Copyright"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-auto max-w-[12px] sm:max-w-[16px] md:max-w-[20px]"
          />
          <span className="text-xs sm:text-sm">2025 Technovation Society. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}