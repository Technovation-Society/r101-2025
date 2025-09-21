import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-light to-blue-dark py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* TECHSOC Logo */}
        <div className="px-4 sm:px-8 md:px-12">
          <Image
            src="/footer/TECHSOC_text.png"
            alt="Technovation Society"
            width={300}
            height={100}
            className="mx-auto h-auto w-auto max-w-full"
          />
        </div>

        {/* Connect with us */}
        <div className="mt-6 mb-6">
          <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold mb-4">Connect with us</h3>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-2 mb-6">
            <a href="https://www.facebook.com/TechnovationSociety" target="_blank" rel="noopener noreferrer" className="glassglow group hover:rotate-3">
              <Image
                src="/footer/facebook_icon.png"
                alt="Facebook"
                width={28}
                height={28}
                className="transition-all duration-300 group-hover:brightness-110"
              />
            </a>
            <a href="https://www.instagram.com/technovationsociety" target="_blank" rel="noopener noreferrer" className="glassglow group hover:-rotate-2">
              <Image
                src="/footer/instagram_icon.png"
                alt="Instagram"
                width={28}
                height={28}
                className="transition-all duration-300 group-hover:brightness-110"
              />
            </a>
            <a href="https://www.linkedin.com/company/technovation-society" target="_blank" rel="noopener noreferrer" className="glassglow group hover:rotate-1">
              <Image
                src="/footer/linkedin_icon.png"
                alt="LinkedIn"
                width={28}
                height={28}
                className="transition-all duration-300 group-hover:brightness-110"
              />
            </a>
            <a href="https://www.tiktok.com/@technovationsociety" target="_blank" rel="noopener noreferrer" className="glassglow group hover:-rotate-3">
              <Image
                src="/footer/tiktok_icon.png"
                alt="TikTok"
                width={28}
                height={28}
                className="transition-all duration-300 group-hover:brightness-110"
              />
            </a>
            <a href="mailto:technovsoc.ust@gmail.com" className="glassglow group hover:rotate-2">
              <Image
                src="/footer/email_icon.png"
                alt="Email"
                width={28}
                height={28}
                className="transition-all duration-300 group-hover:brightness-110"
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