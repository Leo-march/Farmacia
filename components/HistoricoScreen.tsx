'use client'
import { Screen } from '@/app/page'
import TopBar from './TopBar'

interface Props { navigate: (s: Screen) => void }

const historico = [
  { date: '11/02', label: 'Maria Landes Chagas - Loratadina 50mg' },
  { date: '5/04', label: 'Elisa Samudio Marquise - Cloridrato Cetamina 50mg' },
  { date: '12/02', label: 'Maria Landes Chagas - Hidroxiclorquina 25mg' },
]

// Simulated prescription card images using CSS
function PrescriptionCard({ date, index }: { date: string; index: number }) {
  const colors = ['#f5f0e8', '#ffe8f0', '#f0f0e8']
  const rotations = [-2, 1, 0]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 200, height: 260, background: colors[index],
        borderRadius: 8,
        border: '1px solid #ccc',
        transform: `rotate(${rotations[index]}deg)`,
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column', padding: 16,
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ borderBottom: '2px solid #888', paddingBottom: 8, marginBottom: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', color: '#666', lineHeight: 1.3, fontFamily: 'monospace' }}>
            {index === 1 ? (
              <>
                <div style={{ fontWeight: 700 }}>Diretor Responsável: ___________</div>
                <div>Local: #LC</div>
                <div>Nome do Doente: <b>Elisa Samudio Marquise</b></div>
                <div>Enfermaria: ___ Leito: ___</div>
                <div>Apartamento: CC Ambulatório: ___</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>MEDICAMENTO</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '0.45rem' }}>Hospital Municipal Dr. Jose de Carvalho Florence</div>
                <div style={{ fontWeight: 600, marginTop: 2 }}>Maria Landes Chagas</div>
              </>
            )}
          </div>
        </div>
        {/* Body - handwriting simulation */}
        <div style={{ flex: 1, fontSize: '0.55rem', color: '#444', fontFamily: 'cursive', lineHeight: 1.8 }}>
          {index === 1 ? (
            <>
              <div>① Cloridrato Cetamina 50mg/lus — 02ay</div>
              <div style={{ marginLeft: 12 }}>2ml</div>
              <div>Vro(EV) e induças anestésico</div>
            </>
          ) : (
            <>
              <div>① Loratadina Petôniga 50 mg — 120 cp</div>
              <div>② Hidroxiclorquina 25 mg — 120</div>
              <div style={{ marginTop: 8, fontSize: '0.5rem' }}>* fa avitada como travar</div>
              <div style={{ fontSize: '0.5rem' }}>* pare de perder tempo com pioneira gratos</div>
            </>
          )}
        </div>
        {/* Footer */}
        <div style={{ borderTop: '1px solid #aaa', paddingTop: 6, fontSize: '0.45rem', color: '#666', fontFamily: 'monospace', textAlign: 'center' }}>
          Data: 26/05/12 &nbsp; Médico: _______________
        </div>
      </div>
      <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333' }}>{date}</span>
    </div>
  )
}

export default function HistoricoScreen({ navigate }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 50%, #C8102E 100%)' }}>
      <TopBar navigate={navigate} showLogo userName="Rafaela" />

      <button onClick={() => navigate('receitas')} style={{ position: 'absolute', top: 84, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#555' }}>✕</button>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '40px 80px' }}>
        {['11/02', '5/04', '12/02'].map((date, i) => (
          <PrescriptionCard key={date} date={date} index={i} />
        ))}
      </div>
    </div>
  )
}
