const STOPS = [
  {
    title: 'Arts School',
    body: 'Five years learning to think creatively about every situation.',
  },
  {
    title: 'Environmental Nonprofit',
    body: 'Two years working on the ground for the environment.',
  },
  {
    title: 'Sales',
    body: 'With one of the best graduation-trip providers in the country.',
  },
  {
    title: 'International Security',
    body: 'Invited to the Halifax International Security Forum, and realized national defense is something I want to work in.',
  },
  {
    title: 'Languages',
    body: 'Lived in Spain for a month, and dedicated myself to learning as many languages as I can for the rest of my life.',
  },
  {
    title: 'Gap Year',
    body: 'Travelling for adventure, innovating at a startup, showing the whole thing as I go.',
  },
];

export function BackgroundShowcase() {
  return (
    <section
      aria-labelledby="background-heading"
      style={{
        padding: '4rem 1.25rem',
        maxWidth: '48rem',
        marginInline: 'auto',
      }}
    >
      <h2
        id="background-heading"
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 'clamp(1.35rem, 3.2vw, 2.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          margin: '0 0 2rem',
        }}
      >
        MY BACKGROUND
      </h2>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {STOPS.map((stop) => (
          <li
            key={stop.title}
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              padding: '0.9rem 0',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: 900,
                lineHeight: 1.5,
              }}
            >
              •
            </span>
            <p style={{ margin: 0, lineHeight: 1.5 }}>
              <strong>{stop.title}</strong> — {stop.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
