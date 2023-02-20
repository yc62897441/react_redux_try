import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const NavItem = styled.div`
    padding: 5px;
    margin: 5px;
    border: 2px solid black;
    a {
        text-decoration: none;
    }
`

const navs = [
    {
        title: '首頁',
        url: '/',
    },
    {
        title: 'pageA',
        url: '/pageA',
    },
    {
        title: 'weather',
        url: '/weather',
    },
]

function Header() {
    return (
        <HeaderWrapper>
            {navs.length > 0 &&
                navs.map((item) => (
                    <NavItem key={item.title}>
                        <Link to={item.url}>{item.title}</Link>
                    </NavItem>
                ))}
        </HeaderWrapper>
    )
}

export default Header
