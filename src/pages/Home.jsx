import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import './Home.css';
import img01 from '../assets/01.jpg';
import img02 from '../assets/02.jpg';
import img03 from '../assets/03.jpg';
import img04 from '../assets/04.jpg';
import img05 from '../assets/05.jpg';
import img06 from '../assets/06.jpg';
import img07 from '../assets/07.jpg';
import img08 from '../assets/08.jpg';
import img09 from '../assets/09.jpg';
import img10 from '../assets/10.jpg';

export default function Home() {
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;

    if (!container || !leftSection || !rightSection) return;

    // Assicurati che le sezioni siano scrollabili
    const ensureScrollable = () => {
      // Forza il calcolo dell'altezza del contenuto
      leftSection.style.height = '100vh';
      rightSection.style.height = '100vh';
    };

    ensureScrollable();

    // Calcola l'altezza di un singolo set di immagini (5 immagini)
    const getSingleSetHeight = () => {
      // 5 immagini * 100vh + 4 gap * 18px
      return 5 * window.innerHeight + 4 * 18;
    };

    // Inizia lo scroll dal secondo set per permettere il loop
    const singleSetHeight = getSingleSetHeight();
    leftSection.scrollTop = singleSetHeight;
    rightSection.scrollTop = singleSetHeight;

    let isAdjusting = false;

    const handleScrollLoop = (section) => {
      if (isAdjusting) return;
      
      const singleSetHeight = getSingleSetHeight();
      const currentScroll = section.scrollTop;
      
      // Se siamo alla fine del terzo set, resetta al secondo set
      if (currentScroll >= singleSetHeight * 2 - section.clientHeight) {
        isAdjusting = true;
        section.scrollTop = currentScroll - singleSetHeight;
        requestAnimationFrame(() => {
          isAdjusting = false;
        });
      }
      // Se siamo all'inizio del primo set, resetta al secondo set
      else if (currentScroll <= 0) {
        isAdjusting = true;
        section.scrollTop = currentScroll + singleSetHeight;
        requestAnimationFrame(() => {
          isAdjusting = false;
        });
      }
    };

    const scrollSpeed = 0.8; // Velocità di scroll costante (pixel per evento)
    let isScrolling = false;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const delta = e.deltaY;
      
      // Usa solo il segno del delta per determinare la direzione
      // La velocità è sempre costante, indipendentemente dalla velocità/pressione del mouse
      const direction = delta > 0 ? 1 : -1; // 1 per scroll giù, -1 per scroll su
      
      // Applica sempre la stessa quantità di scroll, indipendentemente dal delta
      const fixedScrollAmount = direction * scrollSpeed * 10;
      
      // Le due colonne vanno sempre in direzioni opposte
      // Quando scrollo in alto (direction < 0): left va in alto, right va in basso
      // Quando scrollo in basso (direction > 0): left va in basso, right va in alto
      
      // Left section: va nella stessa direzione dello scroll
      leftSection.scrollTop += fixedScrollAmount;
      
      // Right section: va in direzione opposta allo scroll
      rightSection.scrollTop -= fixedScrollAmount;
      
      // Applica il loop infinito dopo ogni scroll
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          handleScrollLoop(leftSection);
          handleScrollLoop(rightSection);
          isScrolling = false;
        });
      }
    };

    // Listener per gestire il loop anche durante lo scroll programmatico
    const handleScroll = () => {
      handleScrollLoop(leftSection);
      handleScrollLoop(rightSection);
    };

    leftSection.addEventListener('scroll', handleScroll, { passive: true });
    rightSection.addEventListener('scroll', handleScroll, { passive: true });

    // Previeni scroll normale del body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Aggiungi listener alla window per intercettare tutti gli scroll
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('wheel', handleWheel);
      leftSection.removeEventListener('scroll', handleScroll);
      rightSection.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [
    { left: img01, right: img06 },
    { left: img02, right: img07 },
    { left: img03, right: img08 },
    { left: img04, right: img09 },
    { left: img05, right: img10 },
  ];

  // Duplica le immagini per creare il loop infinito
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="app-layout">
      <div className="app-content-wrapper">
        <Navbar />
        <div className="home-split-container" ref={containerRef}>
          <div className="home-left-section" ref={leftSectionRef}>
            {duplicatedImages.map((img, index) => (
              <div key={`left-${index}`} className="home-image-wrapper">
                <img 
                  src={img.left}
                  alt={`Left ${index + 1}`}
                  className="home-image"
                />
              </div>
            ))}
          </div>
          <div className="home-right-section" ref={rightSectionRef}>
            {duplicatedImages.map((img, index) => (
              <div key={`right-${index}`} className="home-image-wrapper">
                <img 
                  src={img.right}
                  alt={`Right ${index + 1}`}
                  className="home-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
