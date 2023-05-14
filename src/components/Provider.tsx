"use client";
import { SessionProvider } from 'next-auth/react'

interface Prop {
      children: React.ReactNode
}

export default function Provider({ children }: Prop) {
      return <SessionProvider>{children}</SessionProvider>
}