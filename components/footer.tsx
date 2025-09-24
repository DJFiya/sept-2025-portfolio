"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Daevik Jain
            </motion.h3>
            <p className="text-muted-foreground mt-2">Quality Driven Engineering</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://github.com/DJFiya"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-violet-400/50 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 text-violet-400" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/daevik-jain"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-400/50 transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5 text-cyan-400" />
            </motion.a>

            <motion.a
              href="mailto:daevikjain@gmail.com"
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-green-400/50 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5 text-green-400" />
            </motion.a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground flex items-center justify-center md:justify-end">
              Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> using Next.js
            </p>
            <p className="text-sm text-muted-foreground mt-1">© 2025 Daevik Jain. All rights reserved.</p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-border/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              University of Waterloo • Biomedical Engineering • Class of 2029
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
