import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Sun, Moon, ChevronDown } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/learn", label: t("nav.learn") },
    { path: "/simulate", label: t("nav.simulate") },
    { path: "/results", label: t("nav.results") },
    { path: "/link-checker", label: t("nav.linkChecker") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const isActive = (path: string) => location.pathname === path;

  const changeLanguage = (lang: "en" | "hi" | "gu") => {
    setLanguage(lang);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              ANWESHAN
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>


          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-3">

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4 mr-1" />

                  <span>
                    {language === "en"
                      ? "EN"
                      : language === "hi"
                      ? "HI"
                      : "GU"}
                  </span>

                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                >
                  English
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => changeLanguage("hi")}
                >
                  हिन्दी
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => changeLanguage("gu")}
                >
                  ગુજરાતી
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>


            {/* Theme */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>


            {/* Auth Buttons */}
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
              >
                {t("nav.login")}
              </Button>
            </Link>

            <Link to="/register">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t("nav.signup")}
              </Button>
            </Link>

          </div>



          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-2">

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>


            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

          </div>

        </div>



        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">

            <div className="flex flex-col space-y-2">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}



              {/* Mobile Language */}
              <div className="flex gap-2 px-4 pt-3 border-t border-border">

                <Button
                  size="sm"
                  variant={language === "en" ? "default" : "outline"}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </Button>

                <Button
                  size="sm"
                  variant={language === "hi" ? "default" : "outline"}
                  onClick={() => changeLanguage("hi")}
                >
                  HI
                </Button>

                <Button
                  size="sm"
                  variant={language === "gu" ? "default" : "outline"}
                  onClick={() => changeLanguage("gu")}
                >
                  GU
                </Button>

              </div>



              {/* Mobile Auth */}
              <div className="flex gap-2 px-4 pt-3">

                <Link
                  to="/login"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    {t("nav.login")}
                  </Button>
                </Link>


                <Link
                  to="/register"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    className="w-full bg-primary"
                  >
                    {t("nav.signup")}
                  </Button>
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
