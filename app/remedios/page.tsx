"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'

const medicines = [
  { id: 1, name: 'Tadalafila', qty: '20mg', maker: 'Neo química', expiry: '20/02', stock: 99, lot: 334, img: '/tadalafila.png' },
  { id: 2, name: 'Dipirona', qty: '20mg', maker: 'Prati Donaduzzi', expiry: '30/05', stock: 99, lot: 794, img: '/dipirona.png' },
  { id: 3, name: 'Cloridrato de fluoxetina', qty: '20mg', maker: 'Sandoz', expiry: '30/08', stock: 99, lot: 891, img: '/fluoxetina.png' },
  { id: 4, name: 'Paracetamol', qty: '750mg', maker: 'Tylenol', expiry: '17/10', stock: 99, lot: 875, img: '/paracetamol.png' },
]

type BasketItem = typeof medicines[0] & { amount: number }

export default function Page() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [basket, setBasket] = useState<BasketItem[]>([])
  const [dragging, setDragging] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (dragging !== null) {
      const med = medicines.find(m => m.id === dragging)
      if (med) {
        setBasket(prev => {
          const existing = prev.find(b => b.id === med.id)
          if (existing) {
            return prev.map(b => b.id === med.id ? { ...b, amount: Math.min(b.amount + 1, b.stock) } : b)
          }
          return [...prev, { ...med, amount: 1 }]
        })
      }
      setDragging(null)
    }
  }

  const updateAmount = (id: number, value: number) => {
    setBasket(prev => prev.map(b => b.id === id ? { ...b, amount: Math.max(1, Math.min(value, b.stock)) } : b))
  }

  const totalItems = basket.reduce((acc, b) => acc + b.amount, 0)

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 50%, #C8102E 100%)' }}>

      <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f0f0f0', borderRadius: 12, padding: '10px 16px', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar"
              style={{ flex: 1, background: 'none', border: 'none', fontSize: '1.1rem', color: '#333', outline: 'none' }}
            />
          </div>

          {/* Cards grid — flex: 1 so it fills remaining height */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1, overflowY: 'auto' }}>
            {filtered.map(med => (
              <div
                key={med.id}
                draggable
                onDragStart={() => setDragging(med.id)}
                onDragEnd={() => setDragging(null)}
                style={{
                  background: '#f8f8f8', borderRadius: 18,
                  padding: '18px 20px',
                  display: 'flex', flexDirection: 'row', gap: 18,
                  cursor: 'grab',
                  border: dragging === med.id ? '2.5px dashed #C8102E' : '2.5px solid transparent',
                  transition: 'all 0.15s',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.09)',
                  alignItems: 'center',
                  minHeight: 180,
                }}
              >
                {/* Image — tall and prominent */}
                <div style={{
                  width: 130, height: 150,
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={med.img}
                    alt={med.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}
                  />
                </div>

                {/* Info — larger text */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#111', lineHeight: 1.25, marginBottom: 4 }}>{med.name}</div>
                  <div style={{ fontSize: '0.95rem', color: '#444' }}><b>Dosagem:</b> {med.qty}</div>
                  <div style={{ fontSize: '0.95rem', color: '#444' }}><b>Fabricante:</b> {med.maker}</div>
                  <div style={{ fontSize: '0.95rem', color: '#444' }}><b>Validade:</b> {med.expiry}</div>
                  <div style={{ fontSize: '0.95rem', color: '#444' }}><b>Estoque:</b> {med.stock} uni</div>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>Lote: {med.lot}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basket area */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            width: 260,
            background: dragOver ? '#fff0f0' : 'white',
            borderLeft: '2px solid',
            borderColor: dragOver ? '#C8102E' : '#ddd',
            display: 'flex', flexDirection: 'column',
            transition: 'all 0.2s',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ padding: '16px 16px 10px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
            <p style={{ fontWeight: 700, fontSize: '1rem', color: '#333', display: 'flex', alignItems: 'center', gap: 6 }}>
              🛒 Carrinho
              {totalItems > 0 && (
                <span style={{ background: '#C8102E', color: 'white', borderRadius: 999, padding: '1px 9px', fontSize: '0.8rem' }}>{totalItems}</span>
              )}
            </p>
          </div>

          {basket.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 14 }}>
              <p style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Arraste um remédio aqui para adicioná-lo
              </p>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
          ) : (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 0' }}>
                {basket.map(b => (
                  <div key={b.id} style={{ background: '#f8f8f8', borderRadius: 10, padding: '10px 12px', marginBottom: 10, fontSize: '0.82rem', color: '#333', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{b.name} {b.qty}</span>
                      <button onClick={() => setBasket(prev => prev.filter(x => x.id !== b.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C8102E', fontWeight: 700, fontSize: '1rem', lineHeight: 1 }}>✕</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>Qtd:</span>
                      <button onClick={() => updateAmount(b.id, b.amount - 1)} style={{ width: 26, height: 26, borderRadius: 6, border: '1.5px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', color: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <input type="number" min={1} max={b.stock} value={b.amount} onChange={e => updateAmount(b.id, parseInt(e.target.value) || 1)} style={{ width: 40, textAlign: 'center', border: '1.5px solid #ddd', borderRadius: 6, padding: '3px 4px', fontSize: '0.88rem', fontWeight: 700, outline: 'none', color: '#222' }} />
                      <button onClick={() => updateAmount(b.id, b.amount + 1)} disabled={b.amount >= b.stock} style={{ width: 26, height: 26, borderRadius: 6, border: '1.5px solid #ddd', background: 'white', cursor: b.amount >= b.stock ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '1rem', color: b.amount >= b.stock ? '#ccc' : '#444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                      <span style={{ fontSize: '0.72rem', color: '#999' }}>/{b.stock}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout button */}
              <div style={{ padding: 12, borderTop: '1px solid #eee', flexShrink: 0 }}>
                <button
                  onClick={() => router.push('/caixa')}
                  style={{ width: '100%', background: '#C8102E', color: 'white', border: 'none', borderRadius: 12, padding: '14px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#9B0B22')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#C8102E')}
                >
                  💳 Ir para o Caixa
                </button>
              </div>
            </>
          )}
        </div>

        {/* Close button */}
        <button onClick={() => router.push('/')} style={{ position: 'absolute', top: 80, right: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#555', fontWeight: 300 }}>✕</button>
      </div>
    </div>
  )
}