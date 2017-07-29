import React, {Component} from 'react'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class NavbarComponent extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <Link className="navbar-brand" to="/" >
            GuestReady!
          </Link>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/properties/new" >
                  New
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/properties" >
                  Properties
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}