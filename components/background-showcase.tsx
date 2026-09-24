const INTRO = [
  "I'm intensely devoted to creating things that change how humans live & think",
  'I take inspiration from innovators like Bridgit Mendler, Martin Luther King, and Eileen Gu',
];

const POINTS = [
  'born & raised in downtown & uptown toronto',
  'arts school for 9 years, developed a strong eye for visuals & talent in all mediums',
  '@ 15, invited to a nato/eu conference in Halifax → found passion in making the world a better place',
  'high school: student council, finance for the Toronto Youth Environmental Council, 30k in sales for GradCity, marketing for Outward Bound Canada',
  'summers: solo travelled Europe, South America, Asia → the world has so many things to offer',
  "currently: deferred Queen's University for a year, creating content, travelling the world (scotland & ireland next) & breaking into go-to-market",
];

export function BackgroundShowcase() {
  return (
    <section
      aria-labelledby="background-heading"
      style={{
        padding: '4rem 1.25rem 0',
        maxWidth: '48rem',
        marginInline: 'auto',
      }}
    >
      <h2
        id="background-heading"
        style={{
          fontFamily: "var(--font-advercase), 'Public Sans', sans-serif",
          fontSize: 'clamp(1.35rem, 3.2vw, 2.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          margin: '0 0 1.25rem',
        }}
      >
        Koshin Bathmax
      </h2>

      {INTRO.map((line) => (
        <p
          key={line}
          style={{
            margin: '0 0 0.6rem',
            lineHeight: 1.5,
            fontSize: '1.05rem',
          }}
        >
          {line}
        </p>
      ))}

      <ul style={{ listStyle: 'none', margin: '1.75rem 0 0', padding: 0 }}>
        {POINTS.map((point) => {
          // Where Koshin is right now is the line a hiring reader cares about
          // most, so it gets boxed out of the run of bullets.
          const isCurrent = point.startsWith('currently:');

          return (
            <li
              key={point}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                padding: isCurrent ? '1.5rem' : '0.4rem 0',
                ...(isCurrent && {
                  marginTop: '1rem',
                  border: '1.5px solid rgba(18,35,63,0.28)',
                  borderRadius: '0.6rem',
                }),
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-advercase), 'Public Sans', sans-serif",
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                •
              </span>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{point}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
