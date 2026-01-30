// TeamLogo.tsx (Server Component)
import Image from 'next/image';
import React from 'react';
import { TeamLogo as TeamLogoProps } from '@/lib/types';

export default function TeamLogo({ logo, name, size = 40 }: TeamLogoProps) {
  if (!logo) return null;
  return (
    <div className="relative w-[size] h-[size]">
      <Image
        src={logo}
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        unoptimized={true} // optional if logos are from external sources without config
      />
    </div>
  );
}