"use client";

interface Props {
  width?: number;
  height?: number;
}

export default function TheEditLogo({ width = 180, height = 56 }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" width={width} height={height}>
      <defs>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,700&family=Montserrat:wght@300&display=swap');
          .te-main {
            font-family: 'Bodoni Moda', 'Didot', 'Bodoni MT', serif;
            font-weight: 700;
            font-size: 44px;
            fill: #FFFFFF;
            letter-spacing: -0.5px;
          }
          .te-sub {
            font-family: 'Montserrat', 'Helvetica Neue', sans-serif;
            font-weight: 300;
            font-size: 9px;
            fill: #C5A880;
            letter-spacing: 10px;
            text-transform: uppercase;
          }
        `}</style>
      </defs>
      <text textAnchor="middle" x="180" y="48" className="te-main">The Edit</text>
      <text textAnchor="middle" x="185" y="68" className="te-sub">Marbella</text>
    </svg>
  );
}
