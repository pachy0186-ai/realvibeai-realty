'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Analytics } from '../components/Analytics';
import SocialLinks from '../components/SocialLinks';
import ContactWidget from '../components/ContactWidget';
import ComplianceBanner from '../components/ComplianceBanner';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* your header / nav that used isMobileMenuOpen */}
      {/* <header> ... </header> */}
      <main>{children}</main>
      {/* your footer / widgets */}
      <Analytics />
      <SocialLinks />
      <ContactWidget />
      <ComplianceBanner />
    </>
  );
}