import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../assets/logos/logo.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://sambarros.com">
                <img src={logo} width="50" height="50" alt="sambarros.com" style={{borderRadius:20 ,color:'white',backgroundColor:'white'}} />
            </Wrapper>
        )
    }
}

export default Logo