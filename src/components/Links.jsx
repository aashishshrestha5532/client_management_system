import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                   Client Management System
                </Link>
                <Collapse>
                    <List>
                    <Item>
                            <Link to="/dashboard" className="nav-link">
                                Home
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/client/registerproject" className="nav-link">
                                New Project
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/clientList" className="nav-link">
                                Clients
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links