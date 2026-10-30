export default function OurMessage() {
  return (
    <section
      aria-labelledby="our-message-title"
      className="bg-[#087a3e] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-white">
            A note from our trust
          </p>
          <h2
            id="our-message-title"
            className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl"
          >
            Our Message
          </h2>

          <div className="mt-8 columns-1 gap-12 text-sm leading-relaxed text-white/95 sm:text-base sm:leading-relaxed lg:columns-2">
            <p>Dear Brothers and Sisters,</p>
            <p className="mt-5 break-inside-avoid">
              We are delighted to introduce our new charity and humanity project called
              &quot;United House Hyderabad India.&quot;
            </p>
            <p className="mt-5 break-inside-avoid">
              Our main aim and objective are to promote acts of kindness and compassion within
              our society in Hyderabad, guided by the principles of Humanity. We believe that
              every human being possesses a &quot;God Spirit,&quot; and it is essential to
              bridge the gaps that have emerged due to ignorance and misguided religious and
              social practices leading to superstitions. By doing so, we hope to bring everyone
              back to the true original divine path.
            </p>
            <p className="mt-5 break-inside-avoid">
              With this vision in mind, we are committed to establishing a new Divine Empire in
              Hyderabad, equipped with various facilities to serve the welfare of humanity. Our
              sincere effort is to nurture the true spirit of understanding, spreading the
              message of God, and enabling all of us to embark on a journey towards glory,
              peace, and prosperity.
            </p>
            <p className="mt-5 break-inside-avoid">
              It is crucial to remember that the essence of our mission lies not only in
              adhering to the letter of the rules but also in upholding the spirit of our
              intentions. At United Trust, we extend our hand to guide you through this
              beautiful journey of self-discovery, from being human to connecting with the
              divine, ultimately achieving inner peace, prosperity, and oneness with the
              Supreme.
            </p>
            <p className="mt-5 break-inside-avoid">
              Join us in this noble endeavor as we strive to create a better world for all.
            </p>
            <div className="mt-5 break-inside-avoid">
              <p>With warm regards,</p>
              <p className="mt-2 font-medium italic">The United Trust</p>
            </div>
          </div>
          <a
            href="/unitedtrust-brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#087a3e] transition-colors hover:bg-[#f3c969] hover:text-[#173a5e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            View Brochure
          </a>
        </div>
      </div>
    </section>
  );
}
