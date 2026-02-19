'use client'
import { useState } from 'react'
import { Screen } from '@/app/page'
import TopBar from './TopBar'

interface Props { navigate: (s: Screen) => void }

const items = [
  { name: 'MONSTER ENERGY WHITE 473ml', qty: 1, price: 15.99 },
  { name: 'CLORIDRATO DE FLUOXETINA 20mg', qty: 1, price: 15.99 },
  { name: 'TADAFILA 20mg', qty: 2, price: 16.99 },
  { name: 'PRESERVATIVO PRUDENCE SABOR CHICLETE 1 und', qty: 3, price: 14.99 },
]

const total = items.reduce((acc, i) => acc + i.qty * i.price, 0)

export default function CaixaScreen({ navigate }: Props) {
  const [paid, setPaid] = useState<string | null>(null)

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 55%, #C8102E 100%)' }}>
      <TopBar navigate={navigate} showLogo={false} userName="Rafaela" />

      <button onClick={() => navigate('home')} style={{ position: 'absolute', top: 84, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#555' }}>✕</button>

      <div style={{ flex: 1, display: 'flex', gap: 32, padding: '24px 40px', alignItems: 'flex-start' }}>
        {/* Items table */}
        <div style={{
          flex: 1,
          border: '2px solid #222',
          borderRadius: 12,
          overflow: 'hidden',
          background: 'white'
        }}>
          {/* Rows */}
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '18px 20px',
              borderBottom: '1px solid #eee',
              gap: 12
            }}>
              <span style={{ flex: 1, fontWeight: 500, color: '#222', fontSize: '0.95rem' }}>{item.name}</span>
              <span style={{ color: '#666', fontWeight: 600 }}>x {item.qty}</span>
              <span style={{
                background: '#f0f0f0', borderRadius: 8, padding: '6px 14px',
                fontWeight: 700, color: '#222', fontSize: '0.95rem', minWidth: 110, textAlign: 'center'
              }}>R${item.price.toFixed(2)} und</span>
            </div>
          ))}
          {/* Empty rows */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`e-${i}`} style={{ height: 56, borderBottom: '1px solid #eee' }} />
          ))}
          {/* Total row */}
          <div style={{
            display: 'flex', alignItems: 'center', padding: '18px 20px',
            background: '#f8f8f8', borderTop: '2px solid #ddd'
          }}>
            <span style={{ flex: 1, fontWeight: 700, fontSize: '0.9rem', color: '#333' }}>PRESERVATIVO PRUDENCE SABOR CHICLETE</span>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#222' }}>R${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 10, minWidth: 200 }}>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#333', textAlign: 'center' }}>Pagamento:</span>
          {[
            { label: 'Cartão', icon: '💳' },
            { label: 'Pix', icon: '◆' },
          ].map(p => (
            <button
              key={p.label}
              onClick={() => setPaid(p.label)}
              style={{
                border: paid === p.label ? '3px solid #C8102E' : '2.5px solid #222',
                borderRadius: 16, padding: '24px 32px',
                background: paid === p.label ? '#fff0f0' : 'white',
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: '1.2rem', fontWeight: 700, color: '#222', gap: 16
              }}
              onMouseEnter={e => { if (!paid) (e.currentTarget.style.background = '#f8f8f8') }}
              onMouseLeave={e => { if (!paid) (e.currentTarget.style.background = 'white') }}
            >
              {p.label} <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
            </button>
          ))}
          {paid && (
            <button
              onClick={() => { navigate('home') }}
              style={{
                background: '#16a34a', color: 'white', border: 'none',
                borderRadius: 12, padding: '16px 24px', fontSize: '1rem',
                fontWeight: 700, cursor: 'pointer', marginTop: 8
              }}
            >
              ✓ Confirmar Pagamento
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
