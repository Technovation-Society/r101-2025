import Image from "next/image";
import { type JSX, useId } from "react";

interface ActivityItem {
    id: string;
    title: string;
    subtitle: string;
    desc: string;
    imgSrc: string;
    imgAlt: string;
}

const ACTIVITIES: ActivityItem[] = [
    {
        desc: "Officially kicks off TechSoc's activities by aligning members with our mission through inspiring success stories and clear governance.",
        id: "lux",
        imgAlt: "stage and auditorium seats",
        imgSrc: "/activities/luxfutura_img.svg",
        subtitle: "TECHSOC General Assembly",
        title: "LUX FUTURA",
    },
    {
        desc: "A skill-building workshop where members specialize in their chosen division.",
        id: "limare",
        imgAlt: "people brainstorming with sticky notes",
        imgSrc: "/activities/limare_img.svg",
        subtitle: "Skill-Based Workshops",
        title: "LIMARE",
    },
    {
        desc: "A mid-year hackathon designed to sharpen skills and ignite competitive spirit.",
        id: "maxima",
        imgAlt: "person coding on laptop",
        imgSrc: "/activities/maxima_img.svg",
        subtitle: "Mid-Year Hackathon",
        title: "MAXIMA",
    },
    {
        desc: "A dynamic interdisciplinary innovation challenge that brings together multi-disciplinary teams to solve real-world problems.",
        id: "hack",
        imgAlt: "hackathon group photo",
        imgSrc: "/activities/hackathom_img.svg",
        subtitle: "Annual UST Grand Hackathon",
        title: "HACK-A-THOM",
    },
    {
        desc: "A community engagement initiative that partners with schools to empower students as changemakers through design thinking workshops.",
        id: "civitas",
        imgAlt: "children smiling and waving",
        imgSrc: "/activities/civitas_img.svg",
        subtitle: "Community Development",
        title: "CIVITAS",
    },
    {
        desc: "Honors the relentless spirit of innovation.",
        id: "virtus",
        imgAlt: "audience at recognition event",
        imgSrc: "/activities/virtus_img.svg",
        subtitle: "Year-End Recognition",
        title: "VIRTUS",
    },
];

export default function Activities(): JSX.Element {
    return (
        <section aria-labelledby="activities-heading" className="max-w-6xl mx-auto px-6 py-12">
            <h2
                id={useId()}
                className="text-center text-4xl lg:text-5xl font-semibold mb-10"
                style={{ fontFamily: "var(--font-seasons), serif" }}
            >
                What We Do
            </h2>

            <div className="flex justify-center">
                <div className="relative w-full max-w-5xl rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_20px_50px_rgba(2,6,23,0.18)] p-8 transition-transform hover:-translate-y-2">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-0.5 rounded-3xl blur-lg opacity-30"
                        style={{ background: "linear-gradient(90deg, rgba(4,7,66,0.06), rgba(0,77,176,0.04))" }}
                    />

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {ACTIVITIES.map((item) => (
                            <article
                                key={item.id}
                                className="flex flex-col items-center text-center px-2"
                                aria-label={item.title}
                            >
                                <div
                                    className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: "#f6f6f6" }}
                                >
                                    <Image
                                        src={item.imgSrc}
                                        alt={item.imgAlt}
                                        className="w-full h-full object-cover"
                                        width={160}
                                        height={160}
                                        loading="lazy"
                                    />
                                </div>

                                <h3
                                    className="text-lg font-extrabold tracking-wider uppercase"
                                    style={{ fontFamily: "var(--font-garet), system-ui, sans-serif" }}
                                >
                                    {item.title}
                                </h3>

                                <p className="text-sm italic font-semibold text-gray-600 mt-2">{item.subtitle}</p>

                                <p className="mt-3 text-sm text-gray-600 max-w-[18rem] text-justify">{item.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

