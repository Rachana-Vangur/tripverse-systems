
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export const FadeIn = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 500,
  once = true,
  threshold = 0.1,
}: FadeInProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add('animate-in');
              element.style.opacity = '1';
              element.style.transform = 'translate(0, 0)';
            }, delay);

            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            element.classList.remove('animate-in');
            element.style.opacity = '0';
            
            switch (direction) {
              case 'up':
                element.style.transform = 'translateY(20px)';
                break;
              case 'down':
                element.style.transform = 'translateY(-20px)';
                break;
              case 'left':
                element.style.transform = 'translateX(20px)';
                break;
              case 'right':
                element.style.transform = 'translateX(-20px)';
                break;
              default:
                element.style.transform = 'translateY(0)';
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, direction, once, threshold]);

  const initialStyle: React.CSSProperties = {
    opacity: 0,
    transform: direction === 'up' 
      ? 'translateY(20px)' 
      : direction === 'down' 
      ? 'translateY(-20px)' 
      : direction === 'left' 
      ? 'translateX(20px)' 
      : direction === 'right' 
      ? 'translateX(-20px)' 
      : 'translateY(0)',
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div 
      ref={elementRef} 
      className={cn(className)} 
      style={initialStyle}
    >
      {children}
    </div>
  );
};
