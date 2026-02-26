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
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      {screen === 'home' && <HomeScreen navigate={navigate} />}
      {screen === 'remedios' && <RemediosScreen navigate={navigate} />}
      {screen === 'receitas' && <ReceitasScreen navigate={navigate} />}
      {screen === 'historico' && <HistoricoScreen navigate={navigate} />}
      {screen === 'caixa' && <CaixaScreen navigate={navigate} />}
      {screen === 'estoque' && <EstoqueScreen navigate={navigate} />}
    </div>
  )
}
