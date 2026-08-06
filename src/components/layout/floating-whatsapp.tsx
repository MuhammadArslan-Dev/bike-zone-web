"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/constants/site";

export function FloatingWhatsApp() {
  return (
    <div className="fixed right-5 bottom-5 z-40 sm:right-8 sm:bottom-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="shadow-elevation-3 relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <MessageCircle className="relative size-6 fill-white text-white" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">Chat with us on WhatsApp</TooltipContent>
      </Tooltip>
    </div>
  );
}
