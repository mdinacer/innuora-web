"use client";

import { APP_CONFIG } from "@/config/app";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import ThemeToggle from "../theme-toggle";
import Link from "next/link";
import { AppLocales } from "@/lib/i18n";
import LanguagePicker from "../language-dropdown";

interface Props {
  className?: string;
  locale?: AppLocales;
  links?: { href: string; label: string }[];
}

const sections = [
  {
    id: "how-it-works",
    label: "How It Works",
  },
  {
    id: "demo",
    label: "Demo",
  },
  {
    id: "early-access",
    label: "Early Access",
  },
  {
    id: "faq",
    label: "FAQ",
  },
];

const LayoutHeader: React.FC<Props> = ({ className, links, locale = "en" }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-b-inn-border-light/50 bg-inn-bg-primary/50 backdrop-blur-md backdrop-saturate-150",
        className
      )}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href={"/"}
          className=" inline-flex items-center gap-x-4 sm:min-w-[150px]"
        >
          <Image
            src={"/assets/images/logo.png"}
            alt={APP_CONFIG.name}
            className="object-cover object-center"
            width={32}
            height={32}
          />
          <div className=" text-inn-bg-accent font-sans text-2xl font-extrabold">
            In<span className="text-inn-bg-flame">nu</span>ora
          </div>
        </Link>

        {links && (
          <nav className="sm:flex items-center gap-4  hidden">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "relative transition-colors duration-200 ease-in",
                  "text-sm font-medium text-inn-text-secondary hover:text-inn-text-primary",
                  "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-inn-bg-accent after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="sm:min-w-[150px] flex items-center gap-6 justify-end">
          <ThemeToggle />
          <LanguagePicker />
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
