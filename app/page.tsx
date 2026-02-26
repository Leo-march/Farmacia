"use client"
import TopBar from '@/components/TopBar'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const cards = [
    { label: 'Remédios', screen: 'remedios', color: '#C8102E' },
    { label: 'Receitas', screen: 'receitas', color: '#555' },
    { label: 'Estoque', screen: 'estoque', color: '#16a34a' },
    { label: 'Caixa', screen: 'caixa', color: '#92400e' },
  ]

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      <div style={{
        width: '100%', height: '100vh',
        background: 'linear-gradient(to bottom, white 45%, #C8102E 100%)',
        display: 'flex', flexDirection: 'column'
      }}>
        <TopBar showLogo userName="Rafaela" />

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="raia-logo fade-in" src="/logo-raia.png" alt="Droga Raia" style={{ height: 90, width: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Cards Grid */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          padding: '40px 120px 60px',
          alignContent: 'center'
        }}>
          {cards.map(({ label, screen, color }) => (
            <button
              key={screen}
              onClick={() => router.push(`/${screen === 'home' ? '' : screen}`)}
              style={{
                border: '2.5px solid #222',
                borderRadius: 20,
                background: 'white',
                cursor: 'pointer',
                padding: '32px 24px',
                fontSize: '1.6rem',
                fontWeight: '700',
                color,
                transition: 'all 0.18s ease',
                letterSpacing: '-0.02em'
              }}
              className="btn card"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
