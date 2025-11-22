import React from "react";
import { motion } from "framer-motion";

interface GoldenBorderProps {
    className?: string;
    children: React.ReactNode;
}

export const GoldenBorder: React.FC<GoldenBorderProps> = ({ className = "", children }) => {
    return (
        <div className={`relative p-[1px] group ${className}`}>
            <div className="absolute inset-0 overflow-hidden rounded-lg">
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.rect
                        width="100%"
                        height="100%"
                        rx="8" // Match rounded-lg
                        fill="none"
                        stroke="url(#gold-gradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <defs>
                        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C5A059" />
                            <stop offset="50%" stopColor="#E6C88B" />
                            <stop offset="100%" stopColor="#9A7B3A" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="relative bg-black rounded-lg h-full w-full overflow-hidden">
                {children}
            </div>
        </div>
    );
};
