'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import bullet_point from "../public/divisions/bullet_star_icon.png";

interface Division {
  id: string;
  name: string;
  color: string;
  description: string;
  items: {
    title: string;
    description: string;
  }[];
}

const divisions: Division[] = [
  {
    id: 'technical',
    name: 'TECHNICAL\nDEVELOPMENT',
    color: 'bg-blue-500',
    description: 'Builds functional prototypes, apps, and tech solutions',
    items: [
      {
        title: 'Software Development',
        description: 'Build and maintain scalable digital platforms for the Technovation Society and TOMASInno Center (TIC).'
      }
    ]
  },
  {
    id: 'market',
    name: 'MARKET\nANALYTICS',
    color: 'bg-green-500',
    description: 'Drives visibility, user engagement, and monetization strategies for projects',
    items: [
      {
        title: 'Growth Marketing',
        description: 'Drive engagement and expand reach across platforms'
      },
      {
        title: 'Media and Journalism',
        description: 'Highlight member achievements and Thomasian innovations'
      },
      {
        title: 'Logistics',
        description: 'Oversees the event\'s necessary materials, equipment, and foods'
      }
    ]
  },
  {
    id: 'research',
    name: 'RESEARCH &\nAPPLIED\nEXPERTISE',
    color: 'bg-purple-600',
    description: 'Ensures solutions are grounded in real-world needs and validated by data/domain expertise',
    items: [
      {
        title: 'Applied Expertise',
        description: 'Validate project feasibility and societal impact'
      },
      {
        title: 'Community Engagement',
        description: 'Connect projects with real world needs'
      },
      {
        title: 'Internal Affairs',
        description: 'Secure partnership within University Organizations'
      },
      {
        title: 'Partnership and External Affairs',
        description: 'Secure resources and collaboration opportunities outside the University'
      }
    ]
  },
  {
    id: 'visual',
    name: 'VISUAL\nDESIGN',
    color: 'bg-pink-500',
    description: 'Designs branding, user experiences, visuals and storytelling',
    items: [
      {
        title: 'UI UX Design',
        description: 'Ensure intuitive, accessible, and visually appealing user experiences'
      },
      {
        title: 'Visual Communication',
        description: 'Strengthen brand identity and engagement through visuals'
      },
      {
        title: 'Multimedia Productions',
        description: 'Produce high quality video content to showcase society impact and handle technical operations on social media'
      },
      {
        title: 'Special Production',
        description: 'Plan out on the event\'s overall theme and setup'
      }
    ]
  }
];

export default function Divisions() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  const currentDivision = divisions[currentIndex];

  const nextDivision = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection('forward');
    //setIsExpanded(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % divisions.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevDivision = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection('backward');
    //setIsExpanded(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + divisions.length) % divisions.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToIndex = (targetIndex: number): void => {
    if (isAnimating || targetIndex === currentIndex) return;
    setIsAnimating(true);
    //setIsExpanded(false);
    
    // Determine direction based on shortest path
    const forwardDistance = (targetIndex - currentIndex + divisions.length) % divisions.length;
    const backwardDistance = (currentIndex - targetIndex + divisions.length) % divisions.length;
    
    setAnimationDirection(forwardDistance <= backwardDistance ? 'forward' : 'backward');
    
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsAnimating(false);
    }, 0);
  };

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleManualNavigation = (direction: 'next' | 'prev' | number): void => {
    // Pause auto-rotation for 6 seconds when user manually navigates
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
    
    if (typeof direction === 'number') {
      goToIndex(direction);
    } else if (direction === 'next') {
      nextDivision();
    } else {
      prevDivision();
    }
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowRight') {
      handleManualNavigation('next');
    } else if (event.key === 'ArrowLeft') {
      handleManualNavigation('prev');
    } else if (event.key === 'Enter' || event.key === ' ') {
      toggleExpanded();
    }
  };

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused || isExpanded) return;
    
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextDivision();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isExpanded, isAnimating, currentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Swipe gesture support
  useEffect(() => {
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      // Swipe threshold = 50px
      if (diffX > 50) {
        handleManualNavigation("next"); // swipe left
      } else if (diffX < -50) {
        handleManualNavigation("prev"); // swipe right
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);


// Generate stable card positions for smooth animation
const getCardStyles = (cardId: string, baseOffset: number) => {
  let currentOffset = baseOffset;

  if (isAnimating) {
    if (animationDirection === 'forward') {
      currentOffset = baseOffset - 1;
    } else {
      currentOffset = baseOffset + 1;
    }
  }

  let positionClass = '';
  let sizeClass = '';
  let opacityClass = '';
  let zIndexClass = '';
  let shadowClass = '';
  let fontSize = '';

  if (currentOffset === -1) {
    // Left card
    positionClass = 'left-1/2 transform -translate-x-[150%] translate-y-8'; 
    sizeClass = 'w-56 h-80'; // bigger side card
    opacityClass = 'opacity-80';
    zIndexClass = 'z-5';
    shadowClass = '';
    fontSize = 'text-lg'; // bigger font
  } else if (currentOffset === 0) {
    // Center card
    positionClass = 'left-1/2 transform -translate-x-1/2';
    sizeClass = 'w-80 h-[28rem]'; // extra big center card
    opacityClass = 'opacity-100';
    zIndexClass = 'z-10';
    shadowClass = 'shadow-2xl';
    fontSize = 'text-3xl'; // extra big font
  } else if (currentOffset === 1) {
    // Right card
    positionClass = 'left-1/2 transform translate-x-[50%] translate-y-8';
    sizeClass = 'w-56 h-80'; // bigger side card
    opacityClass = 'opacity-80';
    zIndexClass = 'z-5';
    shadowClass = '';
    fontSize = 'text-lg'; // bigger font
  } else {
    return {
      positionClass: 'left-1/2 transform -translate-x-1/2 translate-y-8',
      sizeClass: 'w-56 h-80',
      opacityClass: 'opacity-0',
      zIndexClass: 'z-0',
      shadowClass: '',
      fontSize: 'text-lg',
      isCenter: false,
      isLeft: false,
      isRight: false,
    };
  }

  return {
    positionClass,
    sizeClass,
    opacityClass,
    zIndexClass,
    shadowClass,
    fontSize,
    isCenter: currentOffset === 0,
    isLeft: currentOffset === -1,
    isRight: currentOffset === 1,
  };
};




  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-garet overflow-x-hidden">

      {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="font-seasons font-bold text-gray-900 leading-tight 
                      text-[40px] sm:text-[48px] lg:text-[64px]"
          >
            <span className="block lg:inline">The Four Skill</span>{' '}
            <span className="block lg:inline">Based Divisions</span>
          </h1>
        </div>


      {/* Division Cards Container */}
      <div className="relative w-full max-w-5xl mb-16 h-100 overflow-visible">
        {/* Render all divisions with stable IDs */}
        {divisions.map((division, divisionIndex) => {
          // Calculate this division's offset from current center
          const offset = (divisionIndex - currentIndex + divisions.length) % divisions.length;
          const adjustedOffset = offset > divisions.length / 2 ? offset - divisions.length : offset;
          
          const styles = getCardStyles(division.id, adjustedOffset);
          
          // Determine click handler based on position
          let clickHandler;
          if (styles.isCenter) {
            clickHandler = toggleExpanded;
          } else if (styles.isLeft) {
            clickHandler = () => handleManualNavigation(divisionIndex);
          } else if (styles.isRight) {
            clickHandler = () => handleManualNavigation(divisionIndex);
          } else{
            
          }
          
          return (
            <div 
              key={division.id}
              className={`absolute top-0 ${styles.positionClass} ${styles.sizeClass} ${styles.opacityClass} ${styles.zIndexClass} ${styles.shadowClass} ${division.color} rounded-3xl cursor-pointer transition-all duration-700 ease-out hover:scale-105`}
              onClick={clickHandler}
            >
              {styles.isCenter && (
                <div className="absolute top-4 right-4 text-white text-2xl">
                  {isExpanded ? '×' : '+'}
                </div>
              )}
              
              <div className="flex items-center justify-center h-full text-center p-6">
                <h3 className={`text-white font-sifonn leading-tight whitespace-pre-line transition-all duration-700 ${styles.fontSize}`}>
                  {division.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

            {/* Cycle Indicator */}
      <div className="flex space-x-2 mt-8">
        {divisions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? divisions[currentIndex].color.replace('bg-', 'bg-') : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

    {/* Expanded Content */}
    <div
      className={`w-full max-w-4xl transition-all duration-500 overflow-hidden ${
        isExpanded ? 'max-h-[2000px] opacity-100 mt-12 mb-12' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 mx-4">
        <div className="text-center mb-8">
          {/* Top border */}
          <div className={`w-full h-1 ${currentDivision.color} mb-6`}></div>

          <p
            className="font-garet text-gray-700 leading-relaxed"
            style={{ fontSize: '16px' }}
          >
            {currentDivision.description}
          </p>
        </div>

        <div className="space-y-6">
          {currentDivision.items.map((item, index) => (
            <div key={index}>
              <div className="flex items-start">
                {/* Custom bullet */}
                <div
                  className={`mr-4 mt-1 flex-shrink-0 w-4 h-4 ${currentDivision.color}`}
                  style={{
                    WebkitMaskImage: `url(${bullet_point.src})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskImage: `url(${bullet_point.src})`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                  }}
                />

                <div>
                  <h4
                    className="font-seasons text-gray-900 mb-2"
                    style={{ fontSize: '24px' }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="font-garet text-gray-700 leading-relaxed"
                    style={{ fontSize: '16px' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className={`w-full h-1 ${currentDivision.color} mt-8`}></div>
      </div>
    </div>


      {/* Instructions */}
      <br />
      <p className="text-gray-500 text-sm mt-4 text-center">
        Click the card to expand details • Click side cards to navigate • Use arrow keys for keyboard navigation
      </p>
    </section>
  );
}