"use client";

import { MessageCircle } from "lucide-react";
import { phoneNumber } from "@/lib/contact-info";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/923007609299?text=${encodeURIComponent(
    "Hi! I'm interested in learning more about your vehicle tracking plans and services. Can you please provide me with more information?"
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat on WhatsApp
      </div>
    </a>
  );
}
