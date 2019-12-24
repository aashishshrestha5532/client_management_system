import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

import { Modal, Form, Button, Col } from 'react-bootstrap'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`


class UpdateClient extends Component {
    updateUser = event => {
        event.preventDefault()
        
        window.location.href = `/client/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteClient extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${this.props.name} permanently?`,
            )
        ) {
            api.deleteClientById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            columns: [],
            isLoading: false,
            visibleModal: false,
            currentSelected:{}
        }
        this.toggleModal=this.toggleModal.bind(this)
    }




    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllClient().then(response => {
            this.setState({
                clients: response.data.clients,
                isLoading: false,
            })
        })
    }
    toggleModal(id) {

        console.log('id', id)

        if (id != undefined) {
            let data = this.state.clients.filter((item, index) => index == id)
            console.log('curentlySelected', data)
            this.setState({ currentSelected: data[0] })
        }
        this.setState({ visibleModal: !this.state.visibleModal })
    }

    render() {
        const { clients, isLoading } = this.state

        const columns = [
            {
                Header: 'Sn',
                
                Cell: function(props){
                    return (
                        <div>
                            {props.index+1}
                        </div>
                    )
                }
            },
            {
                Header: 'Client Name',
                accessor: 'client_name',
                filterable: true,
            },
            {
                Header: 'Project',
                accessor: 'project_name',
                filterable: true,

            },
            
            {
                Header:'Per_hour_rate',
                Cell: function(props){
                    return (
                        <div>
                        {(props.original.per_hour)? props.original.per_hour : '-'}
                    </div>
                    )
                }
            },

            {
                Header:'No of Hour',
                Cell: function(props){
                    return (
                        <div>
                        {(props.original.no_of_hour)? props.original.no_of_hour : '-'}
                    </div>
                    )
                }
            },
            {
                Header: 'Estimated amount',
                accessor: 'estimated_amount',

            },
            

            {
                Header: 'Languages',
                accessor: '',
               
                Cell: function (props) {
                    return (
                        <div>
                        
                        {props.original.languages.map(item=>(
                            <span>
                                   <Button variant="outline-primary">{item.label}</Button> <br />
                                     </span>
                        ))}
                           
                       
                        </div>
                    )
                },
            },
            
            {
                Header: 'Took at',
                accessor: 'start_date',

            },
            {
                Header: 'Deadline',
                accessor: 'deadline_date',

            },

            {
                Header: 'Status',
               Cell: function (props){
                   return (
                       <div>
                           {(props.original.status==0)? 'pending' : (props.original.status==1? 'Development': 'Completed')}
                       </div>
                   )
               }

            },
            {
                Header: 'Operations',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <DeleteClient id={props.original._id} name={props.original.client_name} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdateClient id={props.original._id}/>
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!clients.length) {
            showTable = false
        }

        return (
            <Wrapper style={{ marginTop: 45 }}>
                {showTable && (
                    <ReactTable
                        data={clients}
                        resolveData={data => data.map(row => row)}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                        SubComponent={row => {
                            return (
                                <div
                                style={{
                                  background: '#ffcf00',
                                  borderRadius: '5px',
                                  overflow: 'hidden',
                                  padding: '5px'
                                }}
                              >
                                 {row.original.project_brief}
                                </div>
                            )
                          }}
                    />
                )}

                <Modal show={this.state.visibleModal} onHide={() => this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Client Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {/* <input type="text" placeholder="Enter Client Name" /><br />
          <input type="text" placeholder="Enter Client Address" /><br />
          <input type="text" placeholder="Enter Project Name" /><br />
          <input type="date" placeholder="Enter Deadline" /><br />
         
           */}

                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Client Name" value={this.state.currentSelected.client_name} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email address" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" value={this.state.currentSelected.address} />
                            </Form.Group>

                            <Form.Group controlId="formGridProjectName">
                                <Form.Label>Project name</Form.Label>
                                <Form.Control value={this.state.currentSelected.project_name} />
                            </Form.Group>

                            <Form.Group controlId="formGridProjectName">
                                <Form.Label>Project Brief</Form.Label>
                                <Form.Control as="textarea" rows="3" placeholder="Project Brief" value={this.state.currentSelected.project_brief} />
                            </Form.Group>


                            <Form.Group controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select">
                                    <option>Choose...</option>
                                    <option>France</option>
                                    <option>USA</option>
                                    <option>Germany</option>
                                    <option>Nepal</option>
                                    <option>Australia</option>
                                </Form.Control>


                            </Form.Group>
                            <Form.Row>



                                <Form.Group as={Col} controlId="formGridStart">
                                    <Form.Label>Took at</Form.Label>
                                    <Form.Control type="date" value={this.state.currentSelected.start_date}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDeadline">
                                    <Form.Label>Deadline</Form.Label>
                                    <Form.Control type="date" value={this.state.currentSelected.deadline_date} />
                                </Form.Group>




                            </Form.Row>

                            <Form.Group id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>


                        </Form>




                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.toggleModal()}>
                            Close
          </Button>
                        <Button variant="primary" onClick={() => this.toggleModal()}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>
            </Wrapper>
        )
    }
}

export default ClientList