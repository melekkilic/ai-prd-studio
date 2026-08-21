import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import LandingPage from '@/pages/LandingPage'
import NewProjectPage from '@/pages/NewProjectPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectWorkspacePage from '@/pages/ProjectWorkspacePage'

function App() {
  return (
   <Routes>
  <Route element={<AppLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/projects/new" element={<NewProjectPage />} />
    <Route path="/projects/:id" element={<ProjectWorkspacePage />} />
  </Route>
</Routes>
  )
}

export default App