import Header from '../../src/components/Header/Header'
import { Container } from '@mui/material'
import MovimentacoesTable from '../../src/components/MovimentacoesTable/MovimentacoesTable'



export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: 'center', height: "100vh"}}>
        <MovimentacoesTable />
      </Container>
    </>
  )
}
