"use client"

import React from "react"

import { useState, useRef, useMemo, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skillsTree = {
  SWE: {
    position: { x: 50, y: 50 },
    size: 120,
    level: 0,
    children: {
      Languages: {
        position: { x: 20, y: 20 },
        size: 80,
        level: 1,
        children: {
          Python: { position: { x: 8, y: 8 }, size: 50, level: 2 },
          Java: { position: { x: 32, y: 6 }, size: 45, level: 2 },
          "C++": { position: { x: 6, y: 28 }, size: 40, level: 2 },
          JavaScript: { position: { x: 28, y: 32 }, size: 55, level: 2 },
          TypeScript: { position: { x: 12, y: 48 }, size: 50, level: 2 },
          SQL: { position: { x: 35, y: 50 }, size: 35, level: 2 },
        },
      },
      Frontend: {
        position: { x: 80, y: 20 },
        size: 75,
        level: 1,
        children: {
          React: { position: { x: 68, y: 8 }, size: 45, level: 2 },
          "Next.js": { position: { x: 92, y: 12 }, size: 42, level: 2 },
          "Three.js": { position: { x: 72, y: 32 }, size: 45, level: 2 },
          Tailwind: { position: { x: 95, y: 35 }, size: 50, level: 2 },
          Expo: { position: { x: 65, y: 50 }, size: 35, level: 2 },
        },
      },
      "Backend & AI": {
        position: { x: 20, y: 80 },
        size: 85,
        level: 1,
        children: {
          Django: { position: { x: 8, y: 68 }, size: 42, level: 2 },
          PyTorch: { position: { x: 32, y: 65 }, size: 45, level: 2 },
          TensorFlow: { position: { x: 6, y: 88 }, size: 44, level: 2 },
          FastAPI: { position: { x: 28, y: 92 }, size: 40, level: 2 },
          OpenCV: { position: { x: 45, y: 75 }, size: 45, level: 2 },
          YOLOv8: { position: { x: 42, y: 85 }, size: 46, level: 2 },
        },
      },
      "Tools & DevOps": {
        position: { x: 80, y: 80 },
        size: 85,
        level: 1,
        children: {
          Git: { position: { x: 68, y: 68 }, size: 40, level: 2 },
          GitHub: { position: { x: 92, y: 72 }, size: 45, level: 2 },
          VSCode: { position: { x: 72, y: 88 }, size: 45, level: 2 },
          "Node.js": { position: { x: 95, y: 92 }, size: 45, level: 2 },
          Vercel: { position: { x: 60, y: 85 }, size: 45, level: 2 },
        },
      },
    },
  },
}

interface SkillNode {
  position: { x: number; y: number }
  size: number
  level: number
  children?: Record<string, SkillNode>
}

const SkillCircle = React.memo(
  ({
    name,
    node,
    depth = 0,
    parentPos,
  }: {
    name: string
    node: SkillNode
    depth?: number
    parentPos?: { x: number; y: number }
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    const textSize = useMemo(() => {
      const baseSize = node.size / 6
      const lengthAdjustment = Math.max(0.7, 1 - (name.length - 5) * 0.05)
      return Math.max(10, Math.min(16, baseSize * lengthAdjustment))
    }, [node.size, name.length])

    const gradientId = useMemo(() => {
      switch (node.level) {
        case 0:
          return "coreGradient"
        case 1:
          return "categoryGradient"
        case 2:
          return "skillGradient"
        default:
          return "skillGradient"
      }
    }, [node.level])

    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])

    return (
      <>
        {parentPos && depth > 0 && (
          <motion.line
            x1={`${parentPos.x}%`}
            y1={`${parentPos.y}%`}
            x2={`${node.position.x}%`}
            y2={`${node.position.y}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: depth * 0.2 }}
          />
        )}

        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: depth * 0.1 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.circle
            cx={`${node.position.x}%`}
            cy={`${node.position.y}%`}
            r={node.size / 2}
            fill="#000000"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            animate={
              isHovered
                ? {
                    filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))",
                  }
                : {}
            }
          />

          <motion.text
            x={`${node.position.x}%`}
            y={`${node.position.y}%`}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white font-medium pointer-events-none"
            fontSize={textSize}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            {name}
          </motion.text>
        </motion.g>

        {node.children &&
          Object.entries(node.children).map(([childName, childNode]) => (
            <SkillCircle
              key={childName}
              name={childName}
              node={childNode}
              depth={depth + 1}
              parentPos={node.position}
            />
          ))}
      </>
    )
  },
)

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillsTreeEntries = useMemo(() => Object.entries(skillsTree), [])

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          My expertise visualized as an interconnected skill tree
        </p>
      </motion.div>

      <motion.div
        className="relative w-full h-[600px] bg-card/20 rounded-2xl border border-border/50 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8 }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <linearGradient id="categoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {skillsTreeEntries.map(([name, node]) => (
            <SkillCircle key={name} name={name} node={node} />
          ))}
        </svg>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 mr-2" />
              SWE
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-pink-500 mr-2" />
              Categories
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mr-2" />
              Technologies
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground mb-4">Always learning and exploring new technologies</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Machine Learning", "Cloud Computing", "DevOps", "Mobile Development"].map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="hover:border-violet-400/50 hover:text-violet-400 transition-colors cursor-pointer"
            >
              {skill} ✨
            </Badge>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
