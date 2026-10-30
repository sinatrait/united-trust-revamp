import { HandHeart, MapPin, Scale, UsersRound } from "lucide-react";

const trustees = [
  { name: "Syed Abdul Wahab", location: "Doha Qatar" },
  { name: "Syed Ibrahim Murtuza", location: "London uk" },
];

const advisors = [
  { name: "Vijay Kumar", detail: "IPS" },
  { name: "V Ram Chander Rao", detail: "CA" },
  { name: "Rick Edward Martin", detail: "USA" },
  { name: "Maqdum Mohiuddin Ghalib" },
  { name: "Sikender Nawab" },
  { name: "Vara Prasad Raju" },
  { name: "Dherminder Reddy Swami" },
];

const volunteers = [
  "G. Prasad Rao",
  "Taj Mohammad Khan",
  "Mahboob Khan Pathan",
  "Shaik Muneer",
  "Anwer Ali",
  "Ghouse Basha",
  "Mohammad Husain",
  "Shakeel Ahmed",
];

export default function Volunteers() {
  return (
    <section
      aria-labelledby="volunteers-title"
      className="bg-[#f5f8fb] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-[#d9e2e9] pb-10 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#a65e28]">
              The people behind our work
            </p>
            <h2
              id="volunteers-title"
              className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-[#173a5e] sm:text-5xl"
            >
              Our Volunteers
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Our volunteers are the beating heart of United Trust, embodying the spirit of
            selflessness and compassion. With their dedication and unwavering support, we
            stand united in our mission to bring hope, joy, and positive change to the lives
            of those we serve. Together, we create a powerful force for good, making a
            profound impact on the world, one act of kindness at a time.
          </p>
        </div>

        <section aria-labelledby="trustees-title" className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#e4edf2] text-[#315f7d]">
              <UsersRound aria-hidden="true" size={19} />
            </span>
            <div>
              <h3 id="trustees-title" className="text-lg font-semibold text-[#173a5e]">
                Trustees
              </h3>
              <p className="text-xs text-slate-500">Guiding the trust and its mission</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <article className="relative overflow-hidden rounded-2xl bg-[#173a5e] p-6 text-white sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-16 size-48 rounded-full border-[28px] border-white/[0.06]"
              />
              <p className="relative text-xs font-semibold uppercase tracking-[0.15em] text-[#efbd88]">
                Founder and Trustee
              </p>
              <h4 className="relative mt-3 max-w-xl text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Pir Syed Shah Ahmed Pasha Qadri
              </h4>
              <div className="relative mt-6 flex flex-col gap-3 border-t border-white/15 pt-5 text-sm text-slate-200 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                <a
                  href="tel:8008712786"
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efbd88]"
                >
                  8008712786
                </a>
                <a
                  href="mailto:unitedtrustind@gmail.com"
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efbd88]"
                >
                  unitedtrustind@gmail.com
                </a>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {trustees.map((trustee) => (
                <article
                  key={trustee.name}
                  className="flex min-h-28 flex-col justify-center rounded-2xl border border-[#dce5eb] bg-white p-5 sm:p-6"
                >
                  <h4 className="text-base font-semibold text-[#173a5e]">{trustee.name}</h4>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin aria-hidden="true" size={15} className="text-[#b87537]" />
                    {trustee.location}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section
            aria-labelledby="advisors-title"
            className="rounded-2xl border border-[#dce5eb] bg-white p-5 sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[#fbf0e4] text-[#a9652d]">
                <Scale aria-hidden="true" size={19} />
              </span>
              <div>
                <h3 id="advisors-title" className="text-lg font-semibold text-[#173a5e]">
                  Legal Advisory Bord
                </h3>
                <p className="text-xs text-slate-500">Our legal advisory team</p>
              </div>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {advisors.map((advisor) => (
                <li
                  key={advisor.name}
                  className="min-h-16 rounded-xl bg-[#f5f8fb] px-4 py-3"
                >
                  <p className="text-sm font-medium text-[#173a5e]">{advisor.name}</p>
                  {advisor.detail && (
                    <p className="mt-1 text-xs text-slate-500">{advisor.detail}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="volunteer-team-title"
            className="rounded-2xl border border-[#dce5eb] bg-[#edf3f6] p-5 sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-white text-[#4e806b]">
                <HandHeart aria-hidden="true" size={19} />
              </span>
              <div>
                <h3 id="volunteer-team-title" className="text-lg font-semibold text-[#173a5e]">
                  Volunteers
                </h3>
                <p className="text-xs text-slate-500">Making a difference together</p>
              </div>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {volunteers.map((volunteer) => (
                <li
                  key={volunteer}
                  className="flex min-h-14 items-center rounded-xl border border-white/80 bg-white/80 px-4 py-3 text-sm font-medium text-[#173a5e]"
                >
                  {volunteer}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
