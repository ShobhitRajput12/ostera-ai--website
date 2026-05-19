import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { X, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useRef();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Read from .env file
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setIsSubmitting(false);
          setIsSuccess(true);
          
          setTimeout(() => {
            onClose();
            setIsSuccess(false);
            form.current.reset();
          }, 2000);
        },
        (error) => {
          setIsSubmitting(false);
          console.error('EmailJS Error:', error.text);
          alert('Failed to send the message. Please ensure you have configured EmailJS correctly.');
        }
      );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with strong blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto pointer-events-none">
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card w-full max-w-4xl p-5 sm:p-12 pointer-events-auto flex flex-col md:flex-row gap-6 md:gap-12 relative before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent dark:before:from-white/5"
              >
                {/* Form Section */}
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-5xl font-bold mb-5 sm:mb-10 text-foreground tracking-tight">Contact Us</h2>
                  <form 
                    ref={form}
                    className="flex flex-col gap-5 sm:gap-8 relative" 
                    onSubmit={sendEmail}
                  >
                  
                  {/* Success Overlay */}
                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg"
                      >
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                        <p className="text-foreground/70 text-center mt-2">We will get back to you soon.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-foreground/90 font-medium mb-2 text-sm tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="bg-transparent border-0 border-b-[1.5px] border-foreground/20 focus:border-primary outline-none py-2 text-foreground transition-colors w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-foreground/90 font-medium mb-2 text-sm tracking-wide">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="bg-transparent border-0 border-b-[1.5px] border-foreground/20 focus:border-primary outline-none py-2 text-foreground transition-colors w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-foreground/90 font-medium mb-2 text-sm tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      required
                      className="bg-transparent border-0 border-b-[1.5px] border-foreground/20 focus:border-primary outline-none py-2 text-foreground transition-colors w-full resize-none"
                    ></textarea>
                  </div>
                  
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full bg-foreground text-background px-6 sm:px-10 py-2.5 sm:py-3.5 text-sm sm:text-base font-medium transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          'Contact Us'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-transparent border border-foreground/20 text-foreground px-5 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base font-medium transition-all hover:bg-foreground/5 active:scale-95 flex items-center justify-center"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col justify-between md:pt-[5.5rem] mt-6 md:mt-0">
                  <div className="space-y-6 sm:space-y-10">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">
                      Contact
                    </h3>
                    <a href="mailto:coo@ostera.ai" className="text-foreground/70 hover:text-primary transition-colors text-lg inline-flex items-center gap-2">
                      <Mail className="w-4 h-4 opacity-70" />
                      coo@ostera.ai
                    </a>
                  </div>
                  </div>

                  <div className="mt-8 sm:mt-16 flex items-center gap-4 sm:gap-5">
                    <a href="#" className="p-2.5 rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-all" aria-label="Facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" className="p-2.5 rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-all" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/-2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href="#" className="p-2.5 rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-all" aria-label="Twitter">
                      <svg xmlns="http://www.w3.org/-2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
