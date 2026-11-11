import { Navigate, Route, Routes } from 'react-router-dom'
import { LegacyPage } from './LegacyPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LegacyPage page="home" />} />
      <Route path="/about" element={<LegacyPage page="about" />} />
      <Route path="/contact" element={<LegacyPage page="contact" />} />
      <Route path="/services" element={<LegacyPage page="services" />} />
      <Route path="/team" element={<LegacyPage page="team" />} />
      <Route path="/404" element={<LegacyPage page="not-found" />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
