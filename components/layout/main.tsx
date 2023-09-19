import { LayoutProps } from '@/models'
import Link from 'next/link'
import * as React from 'react'
//tsrpfc

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>{children}</div>
    </div>
  )
}
