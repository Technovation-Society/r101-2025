"use client"

import Link from "next/link";

interface ButtonProps {
  text: string;
  bgColor?: string;
  href?: string;
}

export default function Button({ text, bgColor, href }: ButtonProps) {
  const buttonStyles = `
    glassglow 
    ${bgColor ? `bg-[${bgColor}]` : "bg-transparent"} 
    text-white 
    font-seasons 
    text-lg md:text-xl 
    px-12 py-6 
    rounded-xl 
    transition-all duration-300 
    hover:scale-105 
    border-2 border-white 
    min-w-64
    w-full max-w-xs
    inline-flex items-center justify-center
    cursor-pointer
    whitespace-nowrap
  `;

  if (href) {
    // Check if it's an anchor link (starts with #)
    if (href.startsWith("#")) {
      const handleSmoothScroll = () => {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };

      return (
        <button className={buttonStyles} onClick={handleSmoothScroll}>
          {text}
        </button>
      );
    }

    // Check if it's an external link
    const isExternalLink = href.startsWith("http") || href.startsWith("https");

    return (
      <Link
        href={href}
        className={buttonStyles}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
      >
        {text}
      </Link>
    );
  }

  return <button className={buttonStyles}>{text}</button>;
}
