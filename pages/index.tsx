import type { NextPage } from 'next'
import { Navbar,  Button, Link, Text, Card, Grid } from "@nextui-org/react";
import voting from '../public/voting.svg'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



const variants = ["static"];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

<Navbar isBordered variant={variants}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Yotsuha
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link isActive href="#">Home</Navbar.Link>
          <Navbar.Link  href="/proposal">New Proposals</Navbar.Link>
          <Navbar.Link href="#">Vote</Navbar.Link>
          <Navbar.Link href="#">Stake</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Connect Wallet
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Grid.Container gap={2} justify="center" style={{ marginTop: '40px'}}>
      <Grid xs={12} md={6}>
      <Card css={{ h: "100%", $$cardColor: '#00000000' }} style={{marginLeft: '64px'}}>
        <Card.Body>
          <Text h1 size={64} color="white"  style={{fontWeight: '600', marginTop: '40px', lineHeight: '64px' }} css={{ m: 0 }} >
            {"Gasless & Omnichain Voting system."}
          </Text>
          <Text h6 size={26} color="white"  style={{fontWeight: '300', marginTop: '12px' }}  css={{ m: 0 }}>
            {"Crosschain messaging allows for on-chain voting from any chain. Users can participate in voting without worrying about gascosts."}
          </Text>
          <Button href="#" style={{ marginTop: '18px', fontWeight:'400', padding:'25px', fontSize:'22px', maxWidth:'max-content', borderRadius:'8px' }} >Try out for free!</Button>
        </Card.Body>
      </Card>
      </Grid>
      <Grid xs={6} md={6}>
      <Card css={{ h: "100%", $$cardColor: '#00000000' }}>
        <Card.Body>
        <Image alt="hero" src={voting} width={1000} height={1000} style={{maxWidth: '100%',height: 'auto',}}/>
        </Card.Body>
      </Card>
      </Grid>
    </Grid.Container>



    </div>
  )
}

export default Home
