import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { getProject, isTodo, projects, todoPrompt } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const title = `${project.name} — Project by Koshin`;
  const url = `https://kbathmax.com/work/${project.slug}`;

  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description, url },
    alternates: { canonical: url },
  };
}

/** Copy that hasn't been written yet — shows the prompt instead of pretending. */
function Unwritten({ prompt }: { prompt: string }) {
  return (
    <p
      className="text-sm leading-relaxed px-4 py-3"
      style={{
        color: "rgb(var(--ink-rgb) / 0.52)",
        border: "1px dashed rgb(var(--ink-rgb) / 0.3)",
        borderRadius: "0.5rem",
      }}
    >
      <span className="font-bold uppercase tracking-[0.15em] text-[0.6rem] block mb-1">
        Still to write
      </span>
      {prompt}
    </p>
  );
}

function Prose({ copy }: { copy: string }) {
  if (isTodo(copy)) return <Unwritten prompt={todoPrompt(copy)} />;
  return (
    <p className="text-base leading-relaxed" style={{ color: "rgb(var(--ink-rgb) / 0.78)" }}>
      {copy}
    </p>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="font-medium text-2xl md:text-3xl tracking-tighter mb-5"
        style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { story, details } = project;

  return (
    <div style={{ background: "var(--paper)", minHeight: "100dvh" }}>
      <Nav />

      <main className="max-w-3xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-32">
        <FadeUp>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-medium mb-8 transition-opacity hover:opacity-100"
            style={{ color: "var(--ink)", opacity: 0.85 }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All work
          </Link>

          <h1
            className="font-medium text-4xl md:text-6xl tracking-tighter mb-4 flex items-center gap-3 flex-wrap"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            {project.name}
            {project.inReview && <span className="status-light shrink-0" aria-hidden />}
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-6"
            style={{ color: "rgb(var(--ink-rgb) / 0.75)" }}
          >
            {project.description}
          </p>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-100"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              {project.linkLabel ?? "View live site"} <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <p
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "#c0392b" }}
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
              No live link right now
            </p>
          )}
        </FadeUp>

        {details && (
          <div className="mt-16 md:mt-20 space-y-12 md:space-y-16">
            <FadeUp>
              <Section title="The problem">
                {details.problem.map((paragraph) => (
                  <Prose key={paragraph} copy={paragraph} />
                ))}
              </Section>
            </FadeUp>

            <FadeUp>
              <Section title="The solution">
                <Prose copy={details.solution} />
              </Section>
            </FadeUp>

            <FadeUp>
              <Section title="Features">
                <ul className="space-y-3 pl-5 list-disc marker:text-[var(--ink)]">
                  {details.features.map((feature) => (
                    <li key={feature} className="pl-1 text-base leading-relaxed" style={{ color: "rgb(var(--ink-rgb) / 0.78)" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
                {details.note && (
                  <p className="text-sm leading-relaxed pt-2" style={{ color: "rgb(var(--ink-rgb) / 0.6)" }}>
                    {details.note}
                  </p>
                )}
              </Section>
            </FadeUp>
          </div>
        )}

        {/* The written thinking comes before the screenshot on purpose — the
            process is the part worth reading. */}
        {story && (
          <div className="mt-16 md:mt-20 space-y-14 md:space-y-16">
            {story.intention && (
              <FadeUp>
                <Section title="Why I built it">
                  <Prose copy={story.intention} />
                </Section>
              </FadeUp>
            )}

            {story.process && story.process.length > 0 && (
              <FadeUp>
                <Section title="How I worked through it">
                  {story.process.map((step, i) => (
                    <Prose key={i} copy={step} />
                  ))}
                </Section>
              </FadeUp>
            )}

            {story.learnings && story.learnings.length > 0 && (
              <FadeUp>
                <Section title="What it taught me">
                  {story.learnings.map((lesson, i) => (
                    <Prose key={i} copy={lesson} />
                  ))}
                </Section>
              </FadeUp>
            )}
          </div>
        )}

        <FadeUp>
          <figure className="mt-16 md:mt-20">
            <div
              className="overflow-hidden"
              style={{ background: "var(--paper-raised)", boxShadow: "0 6px 24px rgb(var(--ink-rgb) / 0.13)" }}
            >
              {project.detailImage ? (
                <Image
                  src={project.detailImage.src}
                  alt={project.detailImage.alt}
                  width={project.detailImage.width}
                  height={project.detailImage.height}
                  sizes="(min-width: 768px) 672px, 100vw"
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-[16/10] relative">
                  <Image
                    src={project.image}
                    alt={`${project.name} — project by Koshin`}
                    fill
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="object-contain p-3"
                  />
                </div>
              )}
            </div>
          </figure>
        </FadeUp>

        {project.detailFirst && project.liveUrl && (
          <FadeUp>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium transition-opacity hover:opacity-100"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              Visit the {project.name} site <ArrowRight className="h-4 w-4" />
            </a>
          </FadeUp>
        )}
      </main>

      <footer style={{ background: "var(--paper)", borderTop: "1px solid rgb(var(--ink-rgb) / 0.10)" }}>
        <div className="flex flex-col items-center gap-2 px-6 py-12 md:px-12 md:py-14">
          <span
            className="text-lg font-medium tracking-tighter"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            koshin<span style={{ color: "var(--ink)" }}>.</span>
          </span>
          <p
            className="text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: "rgb(var(--ink-rgb) / 0.45)" }}
          >
            © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
