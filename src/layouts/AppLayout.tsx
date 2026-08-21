import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import PageContainer from '@/components/PageContainer'

function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>
    </div>
  )
}

export default AppLayout