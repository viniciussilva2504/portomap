const WALL_TONES = ["#F7F1E6", "#EFE1CE", "#F3E8DC", "#E9DCC8", "#F0E6D6"];
const ROOF_TONES = ["#C9280E", "#A82008", "#D4653A", "#B84A1F"];

// Deterministic pseudo-random skyline — house heights (small, kept low so
// the roofline stays clear of the title, tucked along the bottom edge only).
const HOUSES = [
  22, 34, 18, 40, 26, 46, 20, 32, 42, 24, 36, 28, 44, 20, 32, 48, 22, 34, 26, 38, 24, 42, 18, 30,
];

export function HeroSkyline() {
  const viewW = 1440;
  const viewH = 640;
  const groundY = 620;
  const houseWidth = viewW / HOUSES.length;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyline-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE0EF" />
          <stop offset="60%" stopColor="#EAF3EE" />
          <stop offset="100%" stopColor="#FBF3E2" />
        </linearGradient>
      </defs>

      <rect width={viewW} height={viewH} fill="url(#skyline-sky)" />

      <g fill="#ffffff" opacity="0.65">
        <ellipse cx="150" cy="90" rx="80" ry="22" />
        <ellipse cx="230" cy="75" rx="50" ry="16" />
        <ellipse cx="1150" cy="70" rx="100" ry="24" />
        <ellipse cx="1250" cy="95" rx="60" ry="18" />
      </g>

      {/* Rooftop skyline — a low, quiet strip along the riverbank */}
      <g>
        {HOUSES.map((h, i) => {
          const x = i * houseWidth;
          const bodyH = h;
          const roofH = h * 0.45;
          const bodyY = groundY - bodyH;
          const wall = WALL_TONES[i % WALL_TONES.length];
          const roof = ROOF_TONES[i % ROOF_TONES.length];
          return (
            <g key={i}>
              <rect x={x} y={bodyY} width={houseWidth + 1} height={bodyH} fill={wall} opacity="0.95" />
              <polygon
                points={`${x - 1},${bodyY} ${x + houseWidth / 2},${bodyY - roofH} ${x + houseWidth + 1},${bodyY}`}
                fill={roof}
              />
            </g>
          );
        })}
      </g>

      <rect x="0" y={groundY} width={viewW} height={viewH - groundY} fill="#4A6FA5" opacity="0.4" />
    </svg>
  );
}
