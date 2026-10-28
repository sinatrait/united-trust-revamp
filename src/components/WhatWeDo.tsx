import Image from "next/image";

const initiatives = [
  {
    category: "School",
    title: "Education for All",
    excerpt:
      "Empowering the next generation is at the heart of our endeavors. We establish schools and educational centers to provide quality education to children from underprivileged backgrounds, ensuring they have access to a brighter future.",
    image: "/what-we-do/education.jpg",
    imageAlt: "School initiative supporting education for children",
  },
  {
    category: "Hospital",
    title: "Healthcare for the Vulnerable",
    excerpt:
      "Caring for the health and well-being of the less fortunate is paramount. We run hospitals and medical clinics to offer essential healthcare services to those who cannot afford it, giving them a chance to lead healthier lives.",
    image: "/what-we-do/health.jpg",
    imageAlt: "Healthcare initiative serving people in need",
  },
  {
    category: "Convention Center",
    title: "A Space for Community",
    excerpt:
      "Our convention center serves as a hub for community gatherings, events, and workshops that promote learning, cultural exchange, and social cohesion.",
    image: "/what-we-do/convention-center.jpg",
    imageAlt: "Convention center for community events and workshops",
  },
  {
    category: "Flats",
    title: "Affordable Housing",
    excerpt:
      "We believe that everyone deserves a safe and secure place to call home. Our flats and housing projects aim to provide affordable and comfortable living spaces for families in need.",
    image: "/what-we-do/housing.jpg",
    imageAlt: "Affordable housing initiative for families",
  },
  {
    category: "International Library",
    title: "Knowledge Enrichment",
    excerpt:
      "United Trust is proud to house an international library that caters to knowledge seekers from all walks of life. We are committed to fostering a culture of continuous learning and enlightenment.",
    image: "/what-we-do/knowledge.jpg",
    imageAlt: "International library supporting learning and knowledge",
  },
  {
    category: "Devine Center",
    title: "Divine Research Center",
    excerpt:
      "Our divine research center facilitates the study and preservation of various cultural and spiritual practices, promoting understanding and harmony among diverse communities.",
    image: "/what-we-do/divine-research.jpg",
    imageAlt: "Research center preserving cultural and spiritual practices",
  },
  {
    category: "Administration Office",
    title: "Administrative Support",
    excerpt:
      "Efficient administration is crucial for the success of any charitable organization. Our administrative office ensures seamless operations and transparency in all our endeavors.",
    image: "/what-we-do/administration.jpg",
    imageAlt: "United Trust administration office",
  },
  {
    category: "Poor People Marriages",
    title: "Celebrating Love",
    excerpt:
      "In an effort to make weddings accessible to the less fortunate, we organize marriages for poor individuals and couples, providing them with the joyous celebration they deserve.",
    image: "/what-we-do/weddings.jpg",
    imageAlt: "Wedding support initiative for couples in need",
  },
  {
    category: "Everyday food program",
    title: "Eradicating Hunger",
    excerpt:
      "United Trust runs daily food programs that provide nutritious meals to the hungry and impoverished, alleviating hunger and promoting well-being.",
    image: "/what-we-do/charity-food.jpg",
    imageAlt: "Daily food program providing meals to people in need",
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="services"
      aria-labelledby="what-we-do-title"
      className="bg-[#f5f8fb] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b87537]">
            How we serve
          </p>
          <h2
            id="what-we-do-title"
            className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-[#173a5e] sm:text-5xl"
          >
            What We Do
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            At United Trust, our mission is to touch lives and inspire change through a diverse
            array of impactful initiatives. From building schools and hospitals to providing
            food for the hungry, offering affordable housing, and fostering knowledge
            enrichment, we are dedicated to creating a brighter, more inclusive future for all.
            Our commitment to education, healthcare, community development, and social welfare
            is driven by a passion to make a lasting difference and uplift communities, hand in
            hand, towards a better tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {initiatives.map((initiative) => (
            <article
              key={initiative.title}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={initiative.image}
                  alt={initiative.imageAlt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#b87537]">
                  {initiative.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.035em] text-[#173a5e]">
                  {initiative.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{initiative.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
