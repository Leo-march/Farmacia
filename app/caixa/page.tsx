"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'

const items = [
  { name: 'MONSTER ENERGY WHITE 473ml', qty: 1, price: 15.99 },
  { name: 'CLORIDRATO DE FLUOXETINA 20mg', qty: 1, price: 15.99 },
  { name: 'TADAFILA 20mg', qty: 2, price: 16.99 },
  { name: 'PRESERVATIVO PRUDENCE SABOR CHICLETE 1 und', qty: 3, price: 14.99 },
]

const total = items.reduce((acc, i) => acc + i.qty * i.price, 0)

type Screen = 'checkout' | 'confirming' | 'confirmed'

export default function Page() {
  const router = useRouter()
  const [paid, setPaid] = useState<string | null>(null)
  const [screen, setScreen] = useState<Screen>('checkout')

  const handleConfirm = () => {
    setScreen('confirming')
    setTimeout(() => setScreen('confirmed'), 1400)
  }

  if (screen === 'confirming') {
    return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 55%, #C8102E 100%)' }}>
        <TopBar showLogo />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: '5px solid #C8102E', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>Processando pagamento…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'confirmed') {
    return (
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 55%, #C8102E 100%)' }}>
        <TopBar showLogo />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '28px 40px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: 400, animation: 'popIn 0.4s cubic-bezier(0.2, 0.9, 0.2, 1) both' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #16a34a, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(22,163,74,0.35)', flexShrink: 0, animation: 'popIn 0.5s 0.1s cubic-bezier(0.2, 0.9, 0.2, 1) both' }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>Pagamento Confirmado!</h2>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>Compra de <b style={{ color: '#111' }}>R$ {total.toFixed(2)}</b> via <b style={{ color: '#C8102E' }}>{paid}</b> processada com sucesso.</p>
            </div>
            <div style={{ width: '100%', background: '#f8f8f8', borderRadius: 12, padding: '12px 16px' }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '0.8rem', color: '#555', borderBottom: i < items.length - 1 ? '1px solid #eee' : 'none' }}>
                  <span style={{ flex: 1, marginRight: 8 }}>{item.name} ×{item.qty}</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>R$ {(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '2px solid #ddd', fontWeight: 800, fontSize: '0.9rem', color: '#111' }}>
                <span>Total</span><span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => router.push('/')} style={{ width: '100%', background: '#C8102E', color: 'white', border: 'none', borderRadius: 12, padding: '13px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = '#9B0B22')} onMouseLeave={e => (e.currentTarget.style.background = '#C8102E')}>Voltar ao Início</button>
          </div>
        </div>
        <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 55%, #C8102E 100%)' }}>
      <TopBar showLogo />
      <button onClick={() => router.push('/')} style={{ position: 'absolute', top: 84, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#555' }}>✕</button>
      <div style={{ flex: 1, display: 'flex', gap: 32, padding: '24px 40px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, border: '2px solid #222', borderRadius: 12, overflow: 'hidden', background: 'white' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #eee', gap: 12 }}>
              <span style={{ flex: 1, fontWeight: 500, color: '#222', fontSize: '0.95rem' }}>{item.name}</span>
              <span style={{ color: '#666', fontWeight: 600 }}>x {item.qty}</span>
              <span style={{ background: '#f0f0f0', borderRadius: 8, padding: '6px 14px', fontWeight: 700, color: '#222', fontSize: '0.95rem', minWidth: 110, textAlign: 'center' }}>R${item.price.toFixed(2)} und</span>
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (<div key={`e-${i}`} style={{ height: 56, borderBottom: '1px solid #eee' }} />))}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', background: '#f8f8f8', borderTop: '2px solid #ddd' }}>
            <span style={{ flex: 1, fontWeight: 700, fontSize: '0.9rem', color: '#333' }}>TOTAL</span>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#222' }}>R${total.toFixed(2)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 10, minWidth: 200 }}>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#333', textAlign: 'center' }}>Pagamento:</span>
          {[{ label: 'Cartão', icon: '💳' }, { label: 'Pix', icon: '◆' }].map(p => (
            <button key={p.label} onClick={() => setPaid(p.label)} style={{ border: paid === p.label ? '3px solid #C8102E' : '2.5px solid #222', borderRadius: 16, padding: '24px 32px', background: paid === p.label ? '#fff0f0' : 'white', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: '#222', gap: 16 }}>
              {p.label} <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
            </button>
          ))}
          {paid && (
            <button onClick={handleConfirm} style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 12, padding: '16px 24px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginTop: 8, transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = '#15803d')} onMouseLeave={e => (e.currentTarget.style.background = '#16a34a')}>
              ✓ Confirmar Pagamento
            </button>
          )}
        </div>
      </div>
    </div>
  )
}