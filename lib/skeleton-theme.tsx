"use client"

import type React from "react"

import { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      {children}
    </SkeletonTheme>
  )
}
