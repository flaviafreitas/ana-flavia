'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '@/sanity.config'
import {hasSanityConfig} from '@/sanity/env'

export default function StudioPage() {
  if (!hasSanityConfig) {
    return <main style={{padding: 32}}>Configure o projeto Sanity no arquivo .env.local para acessar o Studio.</main>
  }

  return <NextStudio config={config} />
}
