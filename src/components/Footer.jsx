import React from 'react';

import OsteraLogo from './OsteraLogo';

export default function Footer({ onContactClick }) {
  return (
    <footer className="relative z-20 border-t border-foreground/10 bg-transparent pt-8 pb-6 md:pt-8 md:pb-4">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 md:mb-10">
          <div className="col-span-3 md:col-span-4 lg:col-span-3 lg:pr-8">
            <div className="mb-8">
              <OsteraLogo
                showText
                className="gap-2"
                markClassName="h-11 w-auto sm:h-12"
                textClassName="text-lg tracking-[0.14em]"
              />
            </div>
            <p className="text-foreground/60 text-sm mb-8 leading-relaxed">
              Incubated at IITM Incubation Cell & RTBI · TECHIN IIT Palakkad · Tech Partner: IITM Pravartak
            </p>
            <div className="flex items-center gap-6 text-foreground/50">
              <a href="https://www.linkedin.com/company/ostera-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-6">
            <h4 className="text-foreground font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#products" className="hover:text-primary transition-colors">Products</a></li>
              <li>
                <button 
                  onClick={onContactClick}
                  className="hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer outline-none"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-9">
            <h4 className="text-foreground font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="https://rtbi.in/incubationiitm/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IITM Incubation Cell</a></li>
              <li><a href="https://rtbi.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">RTBI</a></li>
              <li><a href="https://techin-iitpkd.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TECHIN IIT Palakkad</a></li>
              <li><a href="https://iitmpravartak.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IITM Pravartak</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-foreground font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms and Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full pt-3 border-t border-foreground/10 text-center text-sm text-foreground/40">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} Ostera AI Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
