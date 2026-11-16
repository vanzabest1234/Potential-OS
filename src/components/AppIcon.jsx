import { useId } from 'react';

const svgProps = (size, className) => ({
  width: size,
  height: size,
  viewBox: '0 0 32 32',
  className,
  'aria-hidden': true,
  focusable: 'false',
});

export function FolderIcon({ size = 32, className }) {
  const id = useId();
  return (
    <svg {...svgProps(size, className)}>
      <defs>
        <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd257" />
          <stop offset="1" stopColor="#e59a0f" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#ffe293" />
          <stop offset="0.5" stopColor="#ffc93c" />
          <stop offset="1" stopColor="#eda31a" />
        </linearGradient>
      </defs>
      <path
        d="M2.4 10.2A3.2 3.2 0 0 1 5.6 7h6.2c.9 0 1.7.35 2.3 1l1.6 1.9h10.7a3 3 0 0 1 3 3v1.3H2.4v-4Z"
        fill={`url(#${id}-back)`}
      />
      <path
        d="M2.4 13.2h27.2v9.1a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2v-9.1Z"
        fill={`url(#${id}-front)`}
      />
      <path d="M2.4 13.2h27.2v1.5H2.4z" fill="#fff" opacity=".5" />
      <path
        d="M2.4 22.4h27.2v.9a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2v-.9Z"
        fill="#b97b06"
        opacity=".18"
      />
    </svg>
  );
}

export function NotepadIcon({ size = 32, className }) {
  const id = useId();
  return (
    <svg {...svgProps(size, className)}>
      <defs>
        <linearGradient id={`${id}-page`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef2f9" />
        </linearGradient>
      </defs>
      <rect x="5.2" y="2.8" width="21.6" height="26.4" rx="3.4" fill={`url(#${id}-page)`} stroke="#ccd4e2" strokeWidth="1" />
      <path d="M5.2 6.2A3.4 3.4 0 0 1 8.6 2.8h6.6v4.9H5.2V6.2Z" fill="#2f7cf6" />
      <path d="M15.2 2.8 20.1 7.7h-4.9V2.8Z" fill="#1c5ecb" opacity=".55" />
      <path d="M9.6 13.4h12.6M9.6 17.5h12.6M9.6 21.6h8.2" stroke="#9db4d6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CalculatorIcon({ size = 32, className }) {
  const id = useId();
  return (
    <svg {...svgProps(size, className)}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#54687e" />
          <stop offset="1" stopColor="#27343f" />
        </linearGradient>
      </defs>
      <rect x="6" y="2.4" width="20" height="27.2" rx="3.4" fill={`url(#${id}-body)`} />
      <rect x="8.8" y="5.4" width="14.4" height="6" rx="1.4" fill="#d7edff" />
      <g fill="#a8bfd6" opacity=".9">
        <rect x="9" y="13.8" width="3.4" height="3.4" rx=".9" />
        <rect x="13.8" y="13.8" width="3.4" height="3.4" rx=".9" />
        <rect x="18.6" y="13.8" width="3.4" height="3.4" rx=".9" />
        <rect x="9" y="17.9" width="3.4" height="3.4" rx=".9" />
        <rect x="13.8" y="17.9" width="3.4" height="3.4" rx=".9" />
        <rect x="18.6" y="17.9" width="3.4" height="3.4" rx=".9" />
        <rect x="9" y="22" width="3.4" height="3.4" rx=".9" />
        <rect x="13.8" y="22" width="3.4" height="3.4" rx=".9" />
        <rect x="9" y="26" width="8.2" height="2.4" rx=".9" />
      </g>
      <rect x="18.6" y="22" width="3.4" height="6.4" rx=".9" fill="#4cc2ff" />
    </svg>
  );
}

export function PhotosIcon({ size = 32, className }) {
  const id = useId();
  return (
    <svg {...svgProps(size, className)}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8adcff" />
          <stop offset="1" stopColor="#3f7bd8" />
        </linearGradient>
        <linearGradient id={`${id}-hill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3aa38a" />
          <stop offset="1" stopColor="#145c52" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x="3" y="5.5" width="26" height="21" rx="3.4" />
        </clipPath>
      </defs>
      <rect x="3" y="5.5" width="26" height="21" rx="3.4" fill={`url(#${id}-sky)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <circle cx="10.6" cy="12" r="2.8" fill="#ffe17a" />
        <path d="M3 25.4 11 15l5.6 6.4L20 17l9 9.4v.2H3v-1.2Z" fill={`url(#${id}-hill)`} />
        <path d="M3 27.5 11 15l5.6 6.4L20 17l9 9.4v.1H3v-.9Z" fill="#0d443e" opacity=".35" />
      </g>
      <rect x="3" y="5.5" width="26" height="21" rx="3.4" fill="none" stroke="#ffffff" strokeOpacity=".5" />
    </svg>
  );
}

export function TerminalIcon({ size = 32, className }) {
  const id = useId();
  return (
    <svg {...svgProps(size, className)}>
      <defs>
        <linearGradient id={`${id}-term`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#2d3442" />
          <stop offset="1" stopColor="#171b23" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="26" height="24" rx="5" fill={`url(#${id}-term)`} />
      <rect x="3.5" y="4.5" width="25" height="23" rx="4.5" fill="none" stroke="#465066" strokeOpacity=".8" />
      <path
        d="M9.6 12.4 13.6 16.4 9.6 20.4"
        stroke="#7ee2b8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="16.4" y="18.6" width="6.4" height="2.2" rx="1.1" fill="#dfe6f2" />
    </svg>
  );
}

export function SettingsIcon({ size = 32, className }) {
  const id = useId();
  return (
    <svg {...svgProps(size, className)}>
      <defs>
        <linearGradient id={`${id}-gear`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#eef4fc" />
          <stop offset="0.55" stopColor="#c2d1e2" />
          <stop offset="1" stopColor="#8ba0ba" />
        </linearGradient>
        <mask id={`${id}-hole`}>
          <rect x="0" y="0" width="32" height="32" fill="#fff" />
          <circle cx="16" cy="16" r="4.7" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${id}-hole)`} fill={`url(#${id}-gear)`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <rect
            key={index}
            x="13.9"
            y="1.4"
            width="4.2"
            height="5.8"
            rx="1.5"
            transform={`rotate(${index * 45} 16 16)`}
          />
        ))}
        <circle cx="16" cy="16" r="10.3" />
      </g>
      <circle cx="16" cy="16" r="10.3" fill="none" stroke="#ffffff" strokeOpacity=".35" strokeWidth=".8" />
      <circle cx="16" cy="16" r="4.7" fill="none" stroke="#0b1220" strokeOpacity=".22" strokeWidth=".9" />
      <path d="M9.6 10.4a8.4 8.4 0 0 1 7.6-4.7" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
