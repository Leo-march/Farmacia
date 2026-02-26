'use client'
import { Screen } from '@/app/page'
import { ClockBar, UserIcon } from './TopBar'

interface Props { navigate: (s: Screen) => void }

const cards = [
  { label: 'Remédios', screen: 'remedios' as Screen, color: '#C8102E' },
  { label: 'Receitas', screen: 'receitas' as Screen, color: '#555' },
  { label: 'Estoque', screen: 'estoque' as Screen, color: '#16a34a' },
  { label: 'Caixa', screen: 'caixa' as Screen, color: '#92400e' },
]

export default function HomeScreen({ navigate }: Props) {
  return (
    <div style={{
      width: '100%', height: '100vh',
      background: 'linear-gradient(to bottom, white 45%, #C8102E 100%)',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* TopBar */}
      <div style={{
        height: 72,
        background: '#e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        borderBottom: '1px solid #ccc',
      }}>
        <ClockBar />
        <div />
        <UserIcon />
      </div>

      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-raia.png" alt="Droga Raia" style={{ height: 90, width: 'auto', objectFit: 'contain' }} />
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
            onClick={() => navigate(screen)}
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
  )
}
