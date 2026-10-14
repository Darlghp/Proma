/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ElectronicBallotSimulator } from './components/ElectronicBallotSimulator';
import { MembershipSimulator } from './components/MembershipSimulator';
import { ManifestoSection } from './components/ManifestoSection';
import { LeadershipSection } from './components/LeadershipSection';
import { StateChaptersDirectory } from './components/StateChaptersDirectory';
import { NewsSection } from './components/NewsSection';
import { DonationSimulator } from './components/DonationSimulator';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observe current scroll position to update active navigation state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'manifesto', 'urna', 'filiacao', 'liderancas', 'diretorios'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        if (sectionId === 'inicio') {
          if (window.scrollY < 400) {
            setActiveSection('inicio');
            break;
          }
          continue;
        }
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-200 selection:text-neutral-900">
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      
      <main className="flex-1">
        <div id="inicio">
          <Hero onNavigate={handleNavigate} />
        </div>
        
        <ManifestoSection />
        <ElectronicBallotSimulator />
        <MembershipSimulator />
        <LeadershipSection />
        <NewsSection />
        <DonationSimulator />
        <StateChaptersDirectory />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
