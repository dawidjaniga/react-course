import { Layout as AntLayout } from 'antd'

import styled from 'styled-components'
import GoogleMap from './GoogleMap'
import Header from './Header'
const { Content, Footer: AntComponent } = AntLayout

const Inner = styled(Content)`
  min-height: 280px;
  background: #fff;
`

const Layout = styled(AntLayout)`
  min-height: 100vh;
`

const Footer = styled(AntComponent)`
  text-align: center;
`

export default function Page () {
  return (
    <Layout>
      <Header />
      <Inner>
        <GoogleMap />
      </Inner>
      <Footer>Netguru College React</Footer>
    </Layout>
  )
}
