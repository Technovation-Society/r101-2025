'use client'

import React, { useState, useEffect } from 'react';
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
    color: "rgba(0, 123, 255, 0.9)", // blue
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
    color: "rgba(38, 167, 69, 0.9)", // green
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
    color: "rgba(128, 0, 128, 0.9)", // purple
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
    color: "rgba(255, 42, 146, 0.9)", // pink
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
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const currentDivision = divisions[currentIndex];

  // Check if device is desktop
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const nextDivision = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection('forward');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % divisions.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevDivision = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection('backward');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + divisions.length) % divisions.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToIndex = (targetIndex: number): void => {
    if (isAnimating || targetIndex === currentIndex) return;
    setIsAnimating(true);
    
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
    // Only pause for mobile since desktop doesn't auto-rotate
    if (!isDesktop) {
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
    }
    
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

  // Mobile auto-rotation restored
  useEffect(() => {
    if (isDesktop) return; // No rotation for desktop
    if (isPaused || isExpanded) return;
    
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextDivision();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isExpanded, isAnimating, currentIndex, isDesktop]);

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

      if (diffX > 50) {
        handleManualNavigation("next");
      } else if (diffX < -50) {
        handleManualNavigation("prev");
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

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

    // Desktop: Static 4 cards with proper gaps and card size
    if (isDesktop) {
      const divisionIndex = divisions.findIndex(d => d.id === cardId);

      if (divisionIndex === 0) {
        positionClass = "left-[2%]";
      } else if (divisionIndex === 1) {
        positionClass = "left-[27%]";
      } else if (divisionIndex === 2) {
        positionClass = "left-[52%]";
      } else if (divisionIndex === 3) {
        positionClass = "left-[77%]";
      }

      // 🔥 EXTRA BIG for desktop
      sizeClass = "w-[28rem] h-[20rem]"; // 448px x 320px
      opacityClass = "opacity-100";
      zIndexClass = "z-5";
      shadowClass = "shadow-2xl";
      fontSize = "text-3xl lg:text-4xl"; // bigger text

      return {
        positionClass,
        sizeClass,
        opacityClass,
        zIndexClass,
        shadowClass,
        fontSize,
        isCenter: false,
        isLeft: false,
        isRight: false,
      };
    }

    // Mobile: Show 3 cards (original behavior with animation)
    else {
      if (currentOffset === -1) {
        positionClass = "left-1/2 transform -translate-x-[110%] translate-y-8";
        sizeClass = "w-72 h-64";
        opacityClass = "opacity-80";
        zIndexClass = "z-5";
        shadowClass = "";
        fontSize = "text-lg";
      } else if (currentOffset === 0) {
        positionClass = "left-1/2 transform -translate-x-1/2";
        sizeClass = "w-80 h-80";
        opacityClass = "opacity-100";
        zIndexClass = "z-10";
        shadowClass = "shadow-2xl";
        fontSize = "text-2xl";
      } else if (currentOffset === 1) {
        positionClass = "left-1/2 transform translate-x-[10%] translate-y-8";
        sizeClass = "w-72 h-64";
        opacityClass = "opacity-80";
        zIndexClass = "z-5";
        shadowClass = "";
        fontSize = "text-lg";
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
    }
  };

  // Calculate chevron position based on current division
  const getChevronPosition = () => {
    if (currentIndex === 0) return "left-[2%] translate-x-[4.5rem]"; // Technical - adjusted left
    if (currentIndex === 1) return "left-[27%] translate-x-[5rem]"; // Market Analytics - adjusted left
    if (currentIndex === 2) return "left-[52%] translate-x-[5.5rem]"; // Research - adjusted left
    if (currentIndex === 3) return "left-[77%] translate-x-[6rem]"; // Visual Design - adjusted left
    return "left-[2%] translate-x-[10rem]"; // fallback
  };

  return (
    <section className="bg-gray-50 flex flex-col items-center p-4 py-16 font-garet overflow-x-hidden">

      {/* Header */}
      <div className="text-center mt-16 mb-16">
        <h1 
          className="font-seasons font-bold text-gray-900 leading-tight 
                    text-[40px] sm:text-[48px] lg:text-[64px]"
        >
          <span className="block lg:inline">The Four Skill</span>{' '}
          <span className="block lg:inline">Based Divisions</span>
        </h1>
      </div>

      {/* PC Instructions - Only show on desktop */}
      {isDesktop && (
        <div className="text-center mb-8">
          <p className="font-garet text-gray-600 text-lg">
            Click on any division card to explore its details
          </p>
        </div>
      )}

      {/* Main Content Container - Fixed Height */}
      <div className="flex flex-col items-center w-full max-w-5xl">
        
        {/* Division Cards Container */}
        <div
          className={`relative w-full mb-8 ${
            isDesktop ? "flex justify-center gap-8 h-[22rem]" : "h-[20rem]"
          } overflow-visible`}
        >

          {divisions.map((division, divisionIndex) => {
            let styles;

            if (isDesktop) {
              // Desktop: all 4 cards visible
              styles = {
                positionClass: "",
                sizeClass: "w-[26rem] h-[20rem]",
                opacityClass: "opacity-100",
                zIndexClass: "z-10",
                shadowClass: "shadow-2xl",
                fontSize: "text-2xl",
                isCenter: true, // Changed to true so X buttons show on desktop
                isLeft: false,
                isRight: false,
              };
            } else {
              // Mobile carousel with offset
              const offset =
                (divisionIndex - currentIndex + divisions.length) % divisions.length;
              const adjustedOffset =
                offset > divisions.length / 2 ? offset - divisions.length : offset;
              styles = getCardStyles(division.id, adjustedOffset);
            }

            let clickHandler;
            if (isDesktop) {
              clickHandler = () => {
                if (currentIndex === divisionIndex) {
                  // If clicking the same card, toggle expanded state
                  toggleExpanded();
                } else {
                  // If clicking different card, select it and expand
                  setCurrentIndex(divisionIndex);
                  setIsExpanded(true);
                }
              };
            } else {
              if (styles.isCenter) {
                clickHandler = () => toggleExpanded();
              } else {
                clickHandler = () => handleManualNavigation(divisionIndex);
              }
            }

            return (
              <div
                key={division.id}
                className={`${isDesktop ? "" : "absolute top-0"} ${
                  styles.positionClass
                } ${styles.sizeClass} 
                           ${styles.opacityClass} ${styles.zIndexClass} ${
                  styles.shadowClass
                } 
                           rounded-2xl cursor-pointer transition-all duration-300 ease-out
                           ${isDesktop && currentIndex === divisionIndex && isExpanded 
                             ? 'scale-105 shadow-2xl' 
                             : 'hover:scale-105'}`}
                style={{ backgroundColor: division.color }}
                onClick={clickHandler}
              >
                {/* X button - Mobile only (center card) */}
                {!isDesktop && styles.isCenter && (
                  <div
                    className="absolute top-3 right-3 text-white text-3xl leading-none cursor-pointer 
                               transition-transform duration-500 ease-in-out z-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Mobile: only center card can toggle expand/collapse
                      toggleExpanded();
                    }}
                    style={{
                      transform: styles.isCenter && isExpanded
                        ? "rotate(45deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    ×
                  </div>
                )}

                <div className="flex items-center justify-center h-full text-center p-4">
                  <h3
                    className={`text-white font-sifonn leading-tight whitespace-pre-line 
                                transition-all duration-300 ${styles.fontSize} font-bold`}
                  >
                    {division.name}
                  </h3>
                </div>
              </div>
            );
          })}

        </div>

        {/* Chevron Arrow - PC Only, show only when division is selected/expanded */}
        {isDesktop && isExpanded && (
          <div className="flex justify-center w-full mb-4 relative">
            <div 
              className={`absolute ${getChevronPosition()} -top-8 transition-all duration-300 ease-out cursor-pointer transform rotate-180`}
              onClick={toggleExpanded}
            >
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="hover:scale-110 transition-transform duration-200"
              >
                <path 
                  d="M7 10L12 15L17 10" 
                  stroke={currentDivision.color.replace('0.9', '1')} 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Cycle Indicator - Only show on mobile */}
        {!isDesktop && (
          <div className="flex space-x-2 mb-4">
            {divisions.map((division, index) => (
              <button
                key={index}
                onClick={() => handleManualNavigation(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex 
                    ? division.color
                    : "rgba(209, 213, 219, 1)",
                }}
              />
            ))}
          </div>
        )}

        {/* Expanded Content - Smooth expand/collapse */}
        <div className="w-full max-w-4xl">
          <div
            className={`transition-all duration-500 ease-out overflow-hidden ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 mx-4">
              <div className="text-center mb-8">
                <div className="w-full h-1 mb-6" style={{ backgroundColor: currentDivision.color }}></div>
                <p className="font-garet text-gray-700 leading-relaxed" style={{ fontSize: '16px' }}>
                  {currentDivision.description}
                </p>
              </div>

              <div className="space-y-6">
                {currentDivision.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-start">
                      <div
                        className="mr-4 mt-1 flex-shrink-0 w-6 h-6"
                        style={{
                          backgroundColor: currentDivision.color,
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
                        <h4 className="font-seasons text-gray-900 mb-2" style={{ fontSize: "24px" }}>
                          {item.title}
                        </h4>
                        <p className="font-garet text-gray-700 leading-relaxed" style={{ fontSize: "16px" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full h-1 mt-8" style={{ backgroundColor: currentDivision.color }}></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}