"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import React from "react"

const experiences = [
  {
    company: "RideCo On-Demand Transit",
    role: "Test and Automation Engineer",
    duration: "May 2025 – Aug 2025",
    location: "Waterloo, ON",
    description:
      "Developed and parallelized 50+ pytest automated regression tests, reducing manual testing effort by 95% and suite runtime by 75%.",
    achievements: [
      "Implemented 40+ development tickets spanning agent features, test automation, API cost optimizations",
      "Audited 80+ WCAG accessibility tests for iOS VoiceOver and website keyboard navigation",
      "Identified and documented 60+ accessibility issues to meet client standards",
    ],
    skills: ["Python", "Pytest", "API Testing", "WCAG", "Automation"],
  },
  {
    company: "Biomechatronic Design Team",
    role: "EMG Sensor Data Analysis",
    duration: "Sep 2024 – April 2025",
    location: "Waterloo, ON",
    description:
      "Collaborated on a machine learning model with 91.56% accuracy to differentiate between 8 unique hand gestures.",
    achievements: [
      "Built AI model using Python, TensorFlow, and Pandas trained on synthetic dataset",
      "Developed Matplotlib Python graphing tool with Tkinter for user-friendly interface",
      "Researched wavelet transformations for data interpretation and ML integration",
    ],
    skills: ["Python", "TensorFlow", "Pandas", "Matplotlib", "Tkinter", "Machine Learning"],
  },
  {
    company: "Pickering High School",
    role: "Hackathon Founder & Project Lead",
    duration: "Mar 2024 – May 2024",
    location: "Ajax, ON",
    description: "Designed hackathon problem space and goal through literature review in medical diagnostics.",
    achievements: [
      "Led introductory coding workshops for 30+ students in predictive modelling",
      "Facilitated coding sessions on system design and algorithmic efficiency",
      "Prepared students for real-world programming challenges",
    ],
    skills: ["Python", "Java", "C++", "Teaching", "Leadership"],
  },
  {
    company: "Northern Karate Schools",
    role: "Senior Karate Instructor",
    duration: "Sep 2020 – June 2024",
    location: "Ajax, ON",
    description:
      "Developed structured training plans to teach 200+ students, refining work ethic and collaborative skills.",
    achievements: [
      "Led organized, high-energy classes of 30-60 students",
      "Applied clear communication and real-time decision-making",
      "Managed administrative workflows and optimized record-keeping",
    ],
    skills: ["Leadership", "Communication", "Training", "Administration"],
  },
]

const ExperienceCard = React.memo(
  ({
    exp,
    index,
    isInView,
  }: {
    exp: (typeof experiences)[0]
    index: number
    isInView: boolean
  }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full transform md:-translate-x-2 z-10" />

      {/* Content Card */}
      <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-foreground">{exp.role}</CardTitle>
                <CardDescription className="text-lg font-semibold text-cyan-400 mt-1">{exp.company}</CardDescription>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {exp.duration}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                {exp.location}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">{exp.description}</p>

            <ul className="space-y-2 mb-4">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1">
              {exp.skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  ),
)

export function ExperienceTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Experience Journey
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          My professional journey through software engineering, research, and leadership roles
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-400 to-cyan-400 transform md:-translate-x-0.5" />

        {experiences.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} index={index} isInView={isInView} />
        ))}
      </div>
    </div>
  )
}
