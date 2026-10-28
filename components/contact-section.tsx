import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";

/** The boxed "Let's talk" block with the contact form, closing out a page. */
export function ContactSection({ heading, body }: { heading: string; body: string }) {
  return (
    <section id="contact" className="scroll-mt-28 max-w-4xl mx-auto py-16">
      <FadeUp>
        <div className="p-6 md:p-12" style={{ background: "#ffffff", border: "1px solid var(--ink)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="font-medium text-3xl md:text-4xl tracking-tight mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {heading}
                <br />
                <br />
                Let&apos;s talk.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgb(var(--ink-rgb) / 0.62)" }}>
                {body}
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
