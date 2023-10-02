import { Inter } from 'next/font/google'
import Header from '../src/components/Header/Header'
import { Container } from '@mui/material'
import ContainerTable from '../src/components/ContainerTable/ContainerTable'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", height: "100vh"}}>
        <ContainerTable />
      </Container>
    </>
  )
}
