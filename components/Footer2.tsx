"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { phoneNumber } from "@/lib/contact-info";

export default function Footer2() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0F172A] text-slate-200 overflow-hidden font-sans border-t border-slate-800">
      
      {/* Deep Background Gradients - Slightly Lighter & Brighter */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none mix-blend-screen" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light pointer-events-none" />

      {/* Top Border Gradient Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
               <div className="relative w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center p-1 border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
                  <Image
                    src="/logocropped.png"
                    alt="Ark Trackers"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">Ark Trackers</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Secure &bull; Track &bull; Control</p>
               </div>
            </Link>
            
            <p className="text-slate-300 leading-relaxed text-sm max-w-sm font-medium">
              Pakistan's #1 GPS Tracking Solution. We provide state-of-the-art vehicle security, fleet management, and real-time monitoring services trusted by thousands.
            </p>

            <div className="flex items-center gap-4 pt-2">
               <div className="flex -space-x-2">
                  {[1,2,3].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold relative z-${3-i}`}>
                       {["U", "T", "F"][i]}
                    </div>
                  ))}
               </div>
               <div className="text-sm font-medium text-slate-300">
                  Trusted by <span className="text-white font-bold">5000+</span> Customers
               </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-blue-400/30 pb-2 w-fit">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Services", href: "/services" },
                { name: "Pricing Plans", href: "/pricing" },
                { name: "Success Stories", href: "/#testimonials" },
                { name: "Contact Support", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-all hover:pl-2 flex items-center gap-2 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">•</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* Column 3: Legal & Help (2 cols) */}
           <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-blue-400/30 pb-2 w-fit">Support</h4>
            <ul className="space-y-3">
              {[
                { name: "Help Center / FAQ", href: "/faq" },
                { name: "Privacy Policy", href: "/licenses" },
                { name: "Terms of Service", href: "/licenses" },
                { name: "Track Your Vehicle", href: "/track" },
                { name: "Get Mobile App", href: "#app" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-all hover:pl-2 flex items-center gap-2 group">
                     <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">•</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & App (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
             <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-blue-400/30 pb-2 w-fit">Get In Touch</h4>
             
             <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                   <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                      <MapPin className="w-4 h-4" />
                   </div>
                   <div className="text-sm">
                      <p className="font-bold text-white mb-0.5">Headquarters</p>
                      <p className="text-slate-300 leading-relaxed font-medium">639-A People Colony No.1, <br />Faisalabad, Pakistan</p>
                   </div>
                </li>

                <li className="flex items-center gap-3 group">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                      <Phone className="w-4 h-4" />
                   </div>
                   <div className="text-sm">
                      <p className="font-bold text-white mb-0.5">24/7 Helpline</p>
                       <p className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium">
                        {phoneNumber.slice(0, 4)}-{phoneNumber.slice(4, 7)}{phoneNumber.slice(7)}
                       </p>
                   </div>
                </li>

                 <li className="flex items-center gap-3 group">
                   <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                   </div>
                   <div className="text-sm">
                      <p className="font-bold text-white mb-0.5">Email Support</p>
                       <a href="mailto:contact@arktrackers.com" className="text-slate-300 hover:text-white transition-colors block font-medium">
                        contact@arktrackers.com
                       </a>
                   </div>
                </li>
             </ul>
             <div className="mt-6 mb-6 flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-full border border-slate-700 hover:border-blue-400/30 transition-colors group w-fit hover:bg-slate-750 shadow-lg shadow-black/20">
              <span className="text-sm font-medium text-slate-400">Made by</span>
              <a href="https://www.techcognify.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                 <span className="font-bold tracking-wide group-hover:text-blue-300 transition-colors text-sm">TechCognify</span>
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
           </div>
          </div>

        </div>

        {/* Bottom Bar - Brighter & Inline with Socials */}
        <div className=" flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-medium">
           
           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p>&copy; {currentYear} Ark Trackers Pvt Ltd. All rights reserved.</p>
              <div className="hidden md:block w-1 h-1 rounded-full bg-slate-600" />
              <div className="flex gap-4">
                 <Link href="/licenses" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link href="/licenses" className="hover:text-white transition-colors">Terms of Use</Link>
                 <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
           </div>

             {/* Socials Moved Here - Right Side */}
             <div className="flex items-center gap-3 mt-4 md:mt-0">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/share/1K9pLbrCa7/?mibextid=wwXIfr", color: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[#1877F2]/40" },
                  { Icon: Youtube, href: "#", color: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[#FF0000]/40" },
                  { Icon: Linkedin, href: "#", color: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[#0A66C2]/40" },
                  { Icon: Instagram, href: "https://www.instagram.com/arktrackers?igsh=c2ZwZ3c4dmZlcnY4", color: "hover:bg-[#E4405F] hover:border-[#E4405F] hover:shadow-[#E4405F]/40" },
                ].map((social, idx) => (
                   <a 
                     key={idx} 
                     href={social.href} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className={`w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-all duration-300 hover:text-white hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                   >
                      <social.Icon className="w-4 h-4" />
                   </a>
                ))}
             </div>
        </div>

        
      </div>
    </footer>
  );
}
