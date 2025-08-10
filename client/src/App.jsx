import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'

function useReinitScripts() {
  useEffect(() => {
    // Re-run any jQuery-based initializers if needed
    if (window.jQuery) {
      // trigger things that depend on DOM ready
      window.jQuery(document).ready(() => {
        // no-op: main.js already binds handlers globally
      })
    }
  }, [])
}

function IframeLike({ page }) {
  useReinitScripts()
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [page])
  return <iframe src={`/${page}.html`} title={page} className="app-frame" />
}

function Page() {
  const { page } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (page && page.startsWith('home-') && page !== 'home-seo-agency') {
      navigate('/p/home-seo-agency', { replace: true })
    }
  }, [page, navigate])
  return <IframeLike page={page || 'home-seo-agency'} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/p/home-seo-agency" replace />} />
        <Route path="/p/home-seo-analysis-op" element={<Navigate to="/p/home-seo-agency" replace />} />
        <Route path="/p/home-seo-analysis" element={<Navigate to="/p/home-seo-agency" replace />} />
        <Route path="/p/home-digital-agency" element={<Navigate to="/p/home-seo-agency" replace />} />
        <Route path="/p/home-digital-agency-op" element={<Navigate to="/p/home-seo-agency" replace />} />
        <Route path="/p/:page" element={<Page />} />
      </Routes>
    </BrowserRouter>
  )
}
