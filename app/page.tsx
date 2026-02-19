'use client'
import { useState } from 'react'
import HomeScreen from '@/components/HomeScreen'
import RemediosScreen from '@/components/RemediosScreen'
import ReceitasScreen from '@/components/ReceitasScreen'
import HistoricoScreen from '@/components/HistoricoScreen'
import CaixaScreen from '@/components/CaixaScreen'
import EstoqueScreen from '@/components/EstoqueScreen'

export type Screen = 'home' | 'remedios' | 'receitas' | 'historico' | 'caixa' | 'estoque'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')

  const navigate = (s: Screen) => setScreen(s)

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '1440px', aspectRatio: '16/9', position: 'relative', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 25px 80px rgba(0,0,0,0.6)' }}>
        {screen === 'home' && <HomeScreen navigate={navigate} />}
        {screen === 'remedios' && <RemediosScreen navigate={navigate} />}
        {screen === 'receitas' && <ReceitasScreen navigate={navigate} />}
        {screen === 'historico' && <HistoricoScreen navigate={navigate} />}
        {screen === 'caixa' && <CaixaScreen navigate={navigate} />}
        {screen === 'estoque' && <EstoqueScreen navigate={navigate} />}
      </div>
    </div>
  )
}
