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
    return (
      <Link href={href} className={buttonStyles}>
        {text}
      </Link>
    );
  }

  return <button className={buttonStyles}>{text}</button>;
}
