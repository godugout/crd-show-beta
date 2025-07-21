
import { useState, useEffect } from 'react';

interface ParallaxScrollState {
  scrollY: number;
  scrollProgress: number;
  isScrollingUp: boolean;
  showScrollIndicator: boolean;
  crdTransform: string;
  taglineTransform: string;
  backgroundTransform: string;
  contentOpacity: number;
}

export const useParallaxScroll = () => {
  const [state, setState] = useState<ParallaxScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrollingUp: false,
    showScrollIndicator: true,
    crdTransform: 'translateY(0px)',
    taglineTransform: 'translateY(0px)',
    backgroundTransform: 'translateY(0px)',
    contentOpacity: 1,
  });

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const updateParallax = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(currentScrollY / windowHeight, 1);
      const isScrollingUp = currentScrollY < lastScrollY;

      // Hide scroll indicator after 50px scroll
      const showScrollIndicator = currentScrollY < 50;

      // Calculate transforms based on scroll progress
      const crdOffset = scrollProgress * -200; // CRD moves up faster
      const taglineOffset = scrollProgress * -100; // Tagline follows
      const backgroundOffset = scrollProgress * -50; // Background moves slower
      
      // Fade out content as we scroll
      const contentOpacity = Math.max(1 - scrollProgress * 1.5, 0);

      // Enhanced transforms for parallax effect
      const crdTransform = `translateY(${crdOffset}px) scale(${1 - scrollProgress * 0.2})`;
      const taglineTransform = `translateY(${taglineOffset}px) scale(${1 - scrollProgress * 0.1})`;
      const backgroundTransform = `translateY(${backgroundOffset}px)`;

      setState({
        scrollY: currentScrollY,
        scrollProgress,
        isScrollingUp,
        showScrollIndicator,
        crdTransform,
        taglineTransform,
        backgroundTransform,
        contentOpacity,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return state;
};
