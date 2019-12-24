import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import Card from './components/Card/'
import { Alert, Container, Row, Col, Card, Accordion, Button, Table, Modal, Form ,Nav ,ProgressBar} from 'react-bootstrap';
import { IoIosPeople, MdPeople } from 'react-icons/fa';
import Select from 'react-select'

import { Input, Label, Menu } from 'semantic-ui-react'
//import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import paths from './utils/ip_path'
import api from './api'
import {VictoryBar,VictoryChart,VictoryTheme,VictoryAxis} from 'victory';


const income = [[
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
],
["quarter1","quarter2","quarter3","quarter4"]

];


const yearly_income = [[
  {quarter: 1, earnings: 130000},
  {quarter: 2, earnings: 110500},
  {quarter: 3, earnings: 142050},
  {quarter: 4, earnings: 120000}
],
["2017","2018","2019","2020"]

];


const monthly_income = [[
  {quarter: 1, earnings: 10000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 19000},
  {quarter: 4, earnings: 25000},
  {quarter: 5, earnings: 24000},
  {quarter: 6, earnings: 28000},
  {quarter: 7, earnings: 21000},
  {quarter: 8, earnings: 15000},
  {quarter: 9, earnings: 15000},
  {quarter: 10, earnings: 25000},
  {quarter: 11, earnings: 19000},
  {quarter: 12, earnings: 28000}

],
["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

];


const DATA = [
  {
    "client_name": "Mark Zuck",
    "address": "France",
    "project_name": "Meteor Project",
    "start_date": "2015-01-15",
    "deadline_date": "2015-03-10",
    "project_brief": "A React project with backend as meteor",
    "estimated_amount": "15000",
    "status": 0
  },
  {
    "client_name": "Hilary Clinton",
    "address": "USA",
    "project_name": "Meteor Project",
    "start_date": "2017-01-15",
    "deadline_date": "2017-03-10",
    "project_brief": "A React project with backend as meteor",
    "estimated_amount": "17000",
    "status": 0
  },
  {
    "client_name": " Binod Khanna",
    "address": "France",
    "project_name": "ReactNative Project",
    "start_date": "2019-01-15",
    "deadline_date": "2019-03-10",
    "project_brief": "A React project with backend as meteor",
    "estimated_amount": "20000",
    "status": 1
  }

]
// options for filtering the client info

const options = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Ongoing' },
  { value: 2, label: 'Finished' },
  { value: 3, label: 'All' }

]

const filter_option=[
  {value:0, label:'monthly'},
  {value:1, label:'quarterly'},
  {value:2, label:'yearly'}
]
class App extends Component {


  constructor(props) {
    super(props)

    this.state = {
      visibleModal: false,
      deleteVisibleModal: false,
      data: DATA,
      search_input: '',
      default_select_value: options[0],
      currentSelected: {},
      filterSelected:true,
      filter_interval:[1,2,3,4],
      filter_type:'quarter',
      income:income,
      sm:4
    }
  }

  componentDidMount(){

    api.getAllClient().then(response=>{
      
        this.setState({data:response.data.clients})
      
      console.log('response',response.data.clients)
    })
  }

  toggleModal(id) {

    console.log('id', id)

    if (id != undefined) {
      let data = this.state.data.filter((item, index) => index == id)
      console.log('curentlySelected', data)
      this.setState({ currentSelected: data[0] })
    }
    this.setState({ visibleModal: !this.state.visibleModal })
  }
  toggleDeleteModal() {
    this.setState({ deleteVisibleModal: !this.state.deleteVisibleModal })

  }
  deleteClientInfo() {
    // Client Info will be deleted
  }
  onFilterChange(value) {

    this.setState({filterSelected:false})
    console.log('value', value)

    // let updated_data=_.where(DATA,{status:value.value})

    let updated_data;

    updated_data = DATA.filter(item => item.status == value.value);

    if (value.value == 3)
      this.setState({ data: DATA })
    else
      this.setState({ data: updated_data })
    // switch(value){

    //   case 0: 
    //     updated_data=this.state.data.filter(item=>item.status==0);
    //     break;
    //   case 1:
    //     updated_data==this.state.data.filter(item=>item.status==value)  
    // }
    // we have to find the option code to perform the required filter

  }

  searchClient(val) {
    console.log('val', val)
    this.setState({ search_input: val })
    let updated_data = DATA.filter(item => item.client_name.includes(val))

    this.setState({ data: updated_data })


    if (val == '') {
      this.setState({ data: DATA })
    }
    console.log('updated_data', updated_data)
  }

  handleIncomeFilter(val){
    console.log('filter_value',val)
    console.log('monthly',yearly_income)
    switch(val.value){
      case 0: 
        this.setState({filter_type:'monthly',filter_interval:[1,2,3,4,5,6,7,8,9,10,11,12],income:monthly_income,sm:12})
        break;
      case 1:
        this.setState({filter_type:'quarterly',filter_interval:[1,2,3,4],income:income,sm:5})
      break;
     case 2:
       this.setState({filter_type:'yearly',income:yearly_income,filter_interval:[1,2,3,4],sm:5})  
       break;
       
     default:
       break;  
      }
  }
  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Client Management System</h2>
        </div> */}
        <br />
        

      
       
        <Container>

        
    
        
          <Row>

          
          
            <Col sm>

              <Card bg="dark" text="white" style={{ width: '18rem' }}>

                <Card.Body>
                  <Card.Title>Clients</Card.Title>

                  <Card.Text>
                    15
            </Card.Text>
                </Card.Body>
              </Card>
              <br />

            </Col>
            <Col sm>
              <Card bg="dark" text="white" style={{ width: '18rem'}}>

                <Card.Body>
                  <Card.Title>Current Project Progress</Card.Title>
                  <Card.Text>

                    <ProgressBar now={60} label={"60% "} />
            </Card.Text>
                </Card.Body>
              </Card>
              <br />

            </Col>
          
            <Col sm>


              <Card bg="dark" text="white" style={{ width: '18rem'}}>

                <Card.Body>
                  <Card.Title>Goals</Card.Title>
                  <Card.Text>
                    Estimated: $15000<br/>

                    <ProgressBar now={30} label={"$4500"}/>
            </Card.Text>
                </Card.Body>
              </Card>
              <br />

            </Col>
            <Col sm>


              <Card bg="dark" text="white" style={{ width: '18rem' }}>

                <Card.Body>
                  <Card.Title>Invoice </Card.Title>
                  <Card.Text>

                    $190000
            </Card.Text>
                </Card.Body>
              </Card>
              <br />

            </Col>
          </Row>

          <Row>


          <Col sm={this.state.sm}>



          <Select options={filter_option}
                 name="filter" 
                 onChange={this.handleIncomeFilter.bind(this)}
                 value={filter_option[1]}
                 />
          <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={{x:0,y:10}}
        animate={{
          duration: 1000,
          onLoad: { duration: 1000 }
        }}
      >

        
        <VictoryAxis
          tickValues={this.state.filter_interval}
          tickFormat={this.state.income[1]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={this.state.income[0]}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    

</Col>


          </Row>
        </Container>
        <Card style={{ width: '80%', padding: 10, left: '10%' }}>
          <h2>Calender Overview</h2>
          <Card.Header style={{ alignContent: 'left' }}>

            <div className="searchBox">
              <Select options={options} defaultValue={this.state.default_select_value} onChange={this.onFilterChange.bind(this)} />
              <input type="text" value={this.state.search_input} placeholder="Search..." id="search" onChange={(e) => this.searchClient(e.target.value)} disabled={this.state.filterSelected}/>

            </div>
          </Card.Header>

          <Card.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Sn</th>
                  <th>Client Name</th>
                  <th>Address</th>
                  <th>Project</th>
                  <th>Project Brief</th>
                  <th>Estimated Amount</th>
                  <th>Took At</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>

                {this.state.data.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.client_name}</td>
                    <td>{item.address}</td>
                    <td>{item.project_name}</td>
                    <td>{item.project_brief}</td>
                    <td>${item.estimated_amount}</td>
                    <td>{item.start_date}</td>
                    <td>{item.deadline_date}</td>
                    <td>{(item.status == 0) ? 'Pending' : 'Done'}</td>
                    <td><Button variant="outline-primary" onClick={() => this.toggleModal(index)}>Edit</Button>   <Button variant="outline-danger" onClick={() => this.toggleDeleteModal()}>Delete</Button></td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </Card.Body>
        </Card>

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


        <Modal show={this.state.deleteVisibleModal} onHide={() => this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Client Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* <input type="text" placeholder="Enter Client Name" /><br />
          <input type="text" placeholder="Enter Client Address" /><br />
          <input type="text" placeholder="Enter Project Name" /><br />
          <input type="date" placeholder="Enter Deadline" /><br />
         
           */}

            Are you sure want to delete the Client Info?



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.deleteClientInfo()}>
              Yes
          </Button>
            <Button variant="primary" onClick={() => this.toggleDeleteModal()}>
              No
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default App;
