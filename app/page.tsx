"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { ProjectsGallery } from "@/components/projects-gallery"
import { SkillsSection } from "@/components/skills-section"
import { ContactForm } from "@/components/contact-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { LoadingScreen } from "@/components/loading-screen"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const handleScroll = () => {
      const sections = ["home", "experience", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLoaded])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <LoadingScreen />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background text-foreground"
          >
            {/* Navigation */}
            <motion.nav
              className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <motion.div
                  className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection("home")}
                >
                  Daevik Jain
                </motion.div>

                <div className="hidden md:flex items-center space-x-6">
                  {["home", "experience", "projects", "skills", "contact"].map((section) => (
                    <motion.button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`capitalize transition-colors hover:text-cyan-400 ${
                        activeSection === section ? "text-cyan-400" : "text-muted-foreground"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section}
                    </motion.button>
                  ))}
                </div>

                <ThemeToggle />
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen">
              <HeroSection />
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20">
              <ExperienceTimeline />
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20">
              <ProjectsGallery />
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20">
              <SkillsSection />
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
              <ContactForm />
            </section>

            {/* Footer */}
            <Footer />

            {/* Scroll to Top */}
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
