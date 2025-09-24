"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    // Create mailto link with pre-filled content
    const subject = `Contact from ${formData.name || 'Website Visitor'}`
    const body = `Hi Daevik,

${formData.message}

Best regards,
${formData.name}${formData.email ? `\n${formData.email}` : ''}`

    const mailtoLink = `mailto:daevikjain@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open email client
    window.location.href = mailtoLink
  }, [formData])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ready to collaborate on exciting projects or discuss opportunities? I'd love to hear from you!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-400/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => window.location.href = 'mailto:daevikjain@gmail.com'}
              >
                <Mail className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">daevikjain@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-400/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => window.location.href = 'tel:647-615-7812'}
              >
                <Phone className="w-6 h-6 text-violet-400" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">647-615-7812</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-400/50 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Waterloo, ON</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect on Social</h4>
            <div className="flex space-x-4">
              <motion.a
                href="https://linkedin.com/in/daevik-jain/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-400/50 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6 text-cyan-400" />
              </motion.a>

              <motion.a
                href="https://github.com/DJFiya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-violet-400/50 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6 text-violet-400" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and it will open your email app with the message ready to send.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email (optional)"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-background/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Open Email App
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
