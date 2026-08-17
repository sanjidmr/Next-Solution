"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Phone, MessageCircle, X, ExternalLink, Headset, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingContactProps {
  currentLang: 'en' | 'bn';
}

export default function FloatingContact({ currentLang }: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const contactOptions = [
    {
      id: 'call',
      nameEn: 'Call Now',
      nameBn: 'কল করুন',
      icon: <Phone className="h-5 w-5" />,
      href: 'tel:+8801711000000',
      colorClass: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30',
      hoverBorder: 'border-indigo-400',
      delay: 0.15,
    },
    {
      id: 'whatsapp',
      nameEn: 'WhatsApp Chat',
      nameBn: 'হোয়াটসঅ্যাপ',
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.42 1.452 5.378 0 9.755-4.379 9.758-9.76.002-2.58-1.003-5.006-2.83-6.835-1.828-1.829-4.253-2.835-6.834-2.835-5.381 0-9.76 4.379-9.764 9.76-.002 1.96.512 3.878 1.492 5.589l-.982 3.582 3.69-.968zm11.393-5.263c-.314-.157-1.858-.917-2.143-1.02-.285-.104-.493-.157-.7.157-.207.315-.802 1.02-.984 1.229-.182.208-.363.235-.677.079-.314-.158-1.324-.487-2.523-1.557-.932-.832-1.56-1.86-1.742-2.175-.182-.315-.02-.485.137-.642.141-.14.314-.367.47-.55.157-.183.21-.314.314-.525.104-.21.052-.394-.026-.55-.078-.157-.7-1.687-.958-2.31-.252-.603-.508-.522-.7-.522-.182-.001-.391-.001-.6-.001-.21 0-.55.079-.838.394-.287.315-1.097 1.073-1.097 2.617 0 1.543 1.123 3.031 1.279 3.241.157.21 2.21 3.374 5.353 4.73.748.322 1.332.514 1.787.658.751.238 1.436.205 1.978.124.604-.09 1.858-.76 2.117-1.457.26-.697.26-1.294.182-1.42-.078-.125-.285-.207-.6-.364z"/>
        </svg>
      ),
      href: 'https://wa.me/8801711000000',
      colorClass: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30',
      hoverBorder: 'border-emerald-400',
      delay: 0.1,
    },
    {
      id: 'messenger',
      nameEn: 'FB Messenger',
      nameBn: 'মেসেঞ্জার',
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.11C24 4.974 18.627 0 12 0zm1.282 14.803l-3.072-3.277-5.992 3.277 6.589-7.001 3.123 3.277 5.941-3.277-6.589 7.001z"/>
        </svg>
      ),
      href: 'https://m.me/nextsolution',
      colorClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30',
      hoverBorder: 'border-blue-400',
      delay: 0.05,
    }
  ];

  return (
    <div 
      ref={containerRef} 
      id="floating-contact-container" 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >
      {/* Sub Buttons Panel (staggered display upwards) */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end mb-4 space-y-3 pointer-events-auto">
            {contactOptions.map((opt, idx) => {
              return (
                <motion.a
                  key={opt.id}
                  id={`floating-btn-${opt.id}`}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.7, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 20 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20, 
                    delay: opt.delay 
                  }}
                  className="flex items-center space-x-3 group"
                >
                  {/* Tooltip Label */}
                  <span className="bg-white dark:bg-[#141414] text-slate-800 text-xs font-black px-3.5 py-1.5 rounded-xl border border-slate-100 shadow-xl opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200 select-none pointer-events-none block whitespace-nowrap">
                    {currentLang === 'en' ? opt.nameEn : opt.nameBn}
                  </span>

                  {/* Circle Action Button */}
                  <div className={`h-12 w-12 rounded-full ${opt.colorClass} flex items-center justify-center shadow-lg transition duration-300 transform group-hover:scale-110 active:scale-95 border-2 border-transparent hover:${opt.hoverBorder}`}>
                    {opt.icon}
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main floating action button */}
      <button
        id="floating-contact-main-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl relative transition duration-300 transform active:scale-90 select-none cursor-pointer ${
          isOpen 
            ? 'bg-slate-900 text-amber-400 rotate-180 border border-slate-800' 
            : 'bg-gradient-to-r from-blue-600 dark:from-orange-500 via-indigo-600 to-indigo-700 text-white hover:shadow-indigo-500/25'
        }`}
        aria-label="Contact Channels Toggle"
      >
        {/* Pulsing ring outline when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-blue-500 animate-ping opacity-40"></span>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center relative"
            >
              <MessageSquare className="h-6 w-6" />
              {/* Micro interactive pulse dot */}
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400 border-2 border-indigo-600"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Mini notification pill showing when not open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="absolute bottom-16 right-0 bg-slate-900 text-white rounded-xl py-1 px-3 border border-slate-800 text-[10px] font-extrabold tracking-wider uppercase flex items-center space-x-1.5 shadow-xl select-none pointer-events-none whitespace-nowrap"
          >
            <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
            <span>{currentLang === 'en' ? 'Get Solution' : 'যোগাযোগ করুন'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
