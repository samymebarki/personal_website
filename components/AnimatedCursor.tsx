'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useMenu } from '../context/MenuContext';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false });

export default function CustomAnimatedCursor() {
  const { isOpen } = useMenu();
  const cursorRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={cursorRef}>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: isOpen ? '#f8e1c2' : '#503822',
        }}
        outerStyle={{
          border: `3px solid ${isOpen ? '#f8e1c2' : '#503822'}`,
        }}
        clickables={[
          'a',
          'button',
          '.link',
          {
            target: '.custom-cursor-target',
            outerScale: 2,
            innerScale: 0.7
          }
        ]}
      />
    </div>
  );
}