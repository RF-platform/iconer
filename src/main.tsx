import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from '@app/providers'
import ItemsPage from '@pages/ItemsPage'
import '@/shared/config/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <ItemsPage />
    </AppProviders>
  </StrictMode>,
)
