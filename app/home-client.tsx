"use client";

import { Nav } from "@/components/nav";
import { StoryHero } from "@/components/story-hero";
import { SelectedWorks } from "@/components/selected-works";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";
import { designWork } from "@/lib/design-work";
import { projects } from "@/lib/projects";
import { SiteFooter } from "@/components/site-footer";

const visibleProjects = projects
  .filter((p) => !p.hidden)
  .sort((a, b) => Number(Boolean(b.liveUrl)) - Number(Boolean(a.liveUrl)));

export function HomeClient() {
  return (
    <>
      <Nav />

      <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <StoryHero />

        <div id="work" className="scroll-mt-28">
          <SelectedWorks products={visibleProjects} designs={designWork} />

          <main className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 md:space-y-32 pt-16 md:pt-24 pb-32">
            {/* Contact section from original work page */}
            <section id="contact" className="scroll-mt-28 max-w-4xl mx-auto py-16">
              <FadeUp>
                <div
                  className="p-6 md:p-12"
                  style={{ background: '#ffffff', border: '1px solid var(--ink)' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                      <h2
                        className="font-medium text-3xl md:text-4xl tracking-tight mb-4 leading-tight"
                        style={{ fontFamily: "var(--font-display)", color: 'var(--ink)' }}
                      >
                        Helping US VC firms look as sharp as their thesis.
                        <br />
                        <br />
                        Let's talk.
                      </h2>
                      <p className="text-base leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.62)' }}>
                        Identity, homepage redesigns, and visual systems for emerging and sector-focused funds.
                      </p>
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </FadeUp>
            </section>
          </main>
        </div>

        <SiteFooter />
      </main>
    </>
  );
}
