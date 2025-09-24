"use client"

import React from "react"

import { useState, useRef, useMemo, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Solari Blind Assistive Headset",
    description:
      "Intelligent assistive headset that enhances spatial awareness for visually impaired users through real-time audio feedback.",
    category: "Hardware",
    image: "/assistive-technology-headset-with-sensors.jpg",
    tech: ["Python", "C", "Embedded Systems", "QNX", "TwelveLabs"],
    features: [
      "AI-powered video analysis pipeline",
      "Real-time obstacle detection",
      "Parallel processing on Raspberry Pi",
      "Audio feedback system",
    ],
    github:"https://github.com/NehaKasoju/hackthe6ix",
    demo: "https://devpost.com/software/aura-gpnklq",
  },
  {
    title: "Blurr - Video Privacy Tool",
    description:
      "FastAPI video modification endpoint using YOLOv8 to blur sensitive information in live video streams.",
    category: "Backend",
    image: "/video-privacy-blurring-interface.jpg",
    tech: ["FastAPI", "OpenCV", "WebRTC", "React", "Python", "TypeScript"],
    features: [
      "95%+ detection accuracy",
      "Sub-50ms frame latency",
      "Real-time background/ID blurring",
      "WebRTC integration",
    ],
    github: "https://github.com/TheAmanM/blurr",
    demo: "https://devpost.com/software/blurr",
    award: "HackTheNorth 2025 Semifinalist",
  },
  {
    title: "PyGuide.ai",
    description:
      "Educational tool combining Duolingo, ChatGPT, and LeetCode to accelerate software engineering learning.",
    category: "Other",
    image: "/educational-coding-platform-interface.jpg",
    tech: ["React", "Expo", "JavaScript", "TypeScript", "APIs"],
    features: [
      "LLM teaching assistant",
      "Virtual IDE with Judge0 API",
      "50% learning acceleration",
      "30+ active users",
    ],
    github: "https://github.com/ArcticCodeMonkeys/PyGuide.ai",
    demo: "https://devpost.com/software/pyguide-ai",
  },
  {
    title: "Virtual Hand Tracking",
    description: "Real-time 3D hand tracking system with gesture recognition and virtual interactions.",
    category: "Backend",
    image: "/3d-hand-tracking-visualization.jpg",
    tech: ["Flask", "OpenCV", "Three.js", "Python", "JavaScript"],
    features: ["Sub-50ms latency", "100+ landmark points processing", "90%+ accuracy", "WebGL rendering"],
    github: "https://github.com/DJFiya/hand-tracking-3d"
  },
  {
    title: "My Diet Map",
    description: "Restaurant finder app with dietary restriction filtering and geolocation-based recommendations.",
    category: "Frontend",
    image: "/restaurant-finder-map-interface.jpg",
    tech: ["React", "JavaScript", "HTML", "CSS", "Selenium"],
    features: [
      "20% faster restaurant search",
      "50 closest restaurants filtering",
      "Real-time geolocation",
      "Yelp API integration",
    ],
    github: "https://github.com/PeterAlpajaro/Dietary_mAPP",
    demo: "https://devpost.com/software/mydietmapp",
  },
  {
    title: "AI Platformer Game",
    description: "Reinforcement learning AI integrated into a real-time platformer game built with PyTorch and SFML.",
    category: "AI/ML",
    image: "/ai-platformer-game-with-neural-network.jpg",
    tech: ["PyTorch", "C++", "SFML"],
    features: [
      "200,000 training steps",
      "Dynamic reward system",
      "Custom tile-based environment",
      "Real-time AI decision making",
    ],
    github: "https://github.com/DJFiya/Droid-Drifter",
  },
]

const categories = ["All", "Hardware", "Frontend", "Backend", "AI/ML", "Other"]

export function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filteredProjects = useMemo(
    () => (selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)),
    [selectedCategory],
  )

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  const handleProjectSelect = useCallback((project: (typeof projects)[0]) => {
    setSelectedProject(project)
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
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A showcase of my technical projects spanning AI/ML, web development, and innovative solutions
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-violet-500"
                  : "hover:border-cyan-400/50"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            isInView={isInView}
            onSelect={handleProjectSelect}
          />
        ))}
      </motion.div>
    </div>
  )
}

const ProjectCard = React.memo(
  ({
    project,
    index,
    isInView,
    onSelect,
  }: {
    project: (typeof projects)[0]
    index: number
    isInView: boolean
    onSelect: (project: (typeof projects)[0]) => void
  }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {project.award && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
              {project.award}
            </Badge>
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm">{project.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1" />
                Code
              </a>
            </Button>
            <Button size="sm" className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                Demo
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ),
)
