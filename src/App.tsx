import { useEffect, useState } from 'react'
import { api } from './services/api'
import './styles/global.scss'
import './styles/sidebar.scss'
import './styles/content.scss'
import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

export interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
    })
  }, [])

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId={selectedGenreId} genres={genres} callback={handleClickButton} />
      <Content selectedGenreId={selectedGenreId} />
    </div>
  )
}
