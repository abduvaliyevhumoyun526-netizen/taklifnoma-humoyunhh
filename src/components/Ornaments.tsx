import React from 'react';

/**
 * Luxury Central Asian & Traditional Floral Filigree SVG Dividers
 */

export const OrnamentalDivider: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-48 h-6 my-6 mx-auto', color = 'currentColor' }) => {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 12H75M125 12H190"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <circle cx="82" cy="12" r="2.5" fill={color} fillOpacity="0.7" />
      <circle cx="118" cy="12" r="2.5" fill={color} fillOpacity="0.7" />
      <path
        d="M100 4C102 8 106 10 110 12C106 14 102 16 100 20C98 16 94 14 90 12C94 10 98 8 100 4Z"
        fill={color}
      />
      <circle cx="100" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  );
};

export const MonogramFrame: React.FC<{
  initials: string;
  size?: number;
  color?: string;
  className?: string;
}> = ({ initials, size = 120, color = 'currentColor', className = '' }) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full animate-spin-slow duration-[30s]"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeOpacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
        {/* Four corner floral accents */}
        <circle cx="50" cy="5" r="2.5" fill={color} />
        <circle cx="50" cy="95" r="2.5" fill={color} />
        <circle cx="5" cy="50" r="2.5" fill={color} />
        <circle cx="95" cy="50" r="2.5" fill={color} />
      </svg>
      <div
        className="font-serif tracking-widest text-center select-none font-bold"
        style={{
          color,
          fontSize: size * 0.28,
          letterSpacing: '0.15em',
          textShadow: '0 0 10px rgba(217, 119, 6, 0.2)',
        }}
      >
        {initials}
      </div>
    </div>
  );
};

export const CornerFlourish: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-16 h-16', color = 'currentColor' }) => {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 56V20C4 11.1634 11.1634 4 20 4H56"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <path
        d="M12 56V24C12 17.3726 17.3726 12 24 12H56"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
      <circle cx="20" cy="20" r="3" fill={color} fillOpacity="0.6" />
    </svg>
  );
};
