import React, { Component } from 'react'
import api from '../api'
import { PropTypes as pt } from 'prop-types'
import Select from 'react-select'
import styled from 'styled-components'
import ReactToPrint from 'react-to-print';
import ComponentToPrint from '../components/ComponentToPrint'

const project_status_filter_option=[
    {
        value: 0 ,label:'Pending'
    },
    {
        value :1 ,label:'Development',
    },{
        value: 2 ,label: 'Completed'
    }
]
const project_type=[
    {value:0, label: 'Fixed'},
    {value:1,  label: 'Hourly Basis'}
]


const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`


const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
const Choice = styled.select.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class RegisterProject extends Component {

    static propTypes = {
        client_name: pt.string.isRequired,
        project_name: pt.string.isRequired,
        project_brief: pt.string.isRequired,
        estimated_amount: pt.string.isRequired,
        languages:pt.array.isRequired
    }
    constructor(props) {
        super(props)

        this.state = {
            client_name: '',
            project_name: '',
            project_brief: '',
            start_date: this.formatDate(new Date()),
            deadline_date: '2019-01-10',
            status: 0,
            address: 'France',
            estimated_amount: '',
            platform: 'Web',
            languages: [],
            project_status:project_status_filter_option[0],
            project_type_value: project_type[0],
            per_hour:0,
            no_of_hour:0



        }


    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    handleChange(e) {

        // Formatting per hour in Integer and accepting others as normal String
        if(e.target.id =='per_hour'){
            this.setState({ [e.target.id]: parseInt( e.target.value )})
        }
        else
        this.setState({ [e.target.id]: e.target.value })
    }

    handleInsertProject = async () => {
        const { client_name, project_name, project_brief, address, start_date, deadline_date, estimated_amount, status,languages,platform,per_hour,no_of_hour } = this.state
      
        const payload = { client_name, project_name, project_brief, address, start_date, deadline_date, estimated_amount, status,languages,platform,per_hour,no_of_hour }

        await api.registerClient(payload).then(res => {
            window.alert(`Project inserted successfully`)
            this.setState({
                client_name: '',
                project_name: '',
                project_brief: '',
                start_date: '',
                deadline_date: '',
                status: 0,
                address: '',
                estimated_amount: '',
                platform: '',
                languages: [],
                isHourlySet:false
            })
        })
    }

    handleMultipleSelect(value){
        console.log('multi',value)
        this.setState({languages:value})
    }

    handlePlatform(value){
        console.log('plat',value)
        this.setState({platform:value})
    }
    handleProjectStatusFilter(value){
        console.log('status_value',value)
        this.setState({status:value.value,project_status:value})
    }
    handleProjectType(value){
        if(value.value==0)
            this.setState({project_type_value:value,isHourlySet:false})
        else{
            this.setState({project_type_value:value,isHourlySet:true})
        }

    }
    handleNoOfHours(hours){
        // console.log('hours',hours)
        this.setState({no_of_hour:parseInt(hours),estimated_amount: Math.floor(parseInt(hours) * this.state.per_hour)})
        
       
        
    }

    render() {

        
        const PLATFORM_DATA = [
            { value: 0, label: 'Android' },
            { value: 1, label: 'React' },
            { value: 2, label: 'React Native' },
            { value: 3, label: 'WordPress' },
            { value: 4, label: 'Joomla' },
            { value: 5, label: 'Meteor' },
        ]
        const platform_options=[
            {value :0 , label:'web'},
            {value :1 , label:'desktop'},
            {value :2 , label:'mobile'},
            {value: 3, label:'cross-platform'}
        ]

        const { client_name, project_brief, project_name, start_date, deadline_date, status, estimated_amount, Languages,platform,no_of_hour,per_hour } = this.state
        return (
            <Wrapper>
                <Title>New Project</Title>

                <Label>Project Name <b style={{ color: 'red' }}> *</b></Label>
                <InputText
                    type="text"
                    id="project_name"
                    value={project_name}
                    onChange={this.handleChange.bind(this)}
                />

                <Label>Project Brief: </Label>
                <InputText
                    type="text"
                    id="project_brief"
                    value={project_brief}
                    onChange={(e) => this.handleChange(e)}
                />


                <Label>Client:  <b style={{ color: 'red' }}>*</b></Label>
                <InputText
                    type="text"
                    id="client_name"
                    value={client_name}
                    onChange={(e) => this.handleChange(e)}
                />

                <Label>Deadline:  <b style={{ color: 'red' }}>*</b></Label>
                <InputText
                    type="date"
                    id="deadline_date"
                    value={deadline_date}
                    onChange={(e) => this.handleChange(e)}
                />

                <Label>Platform </Label>
                <Select options={platform_options}
                 name="platform" 
                 onChange={(e)=>this.handlePlatform(e)}
                 value={platform}
                 />
                <Label>Languages: </Label>

                <Select
                    defaultValue={[PLATFORM_DATA[2], PLATFORM_DATA[3]]}
                    isMulti
                    name="languages"
                    options={PLATFORM_DATA}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={this.handleMultipleSelect.bind(this)}
                />
                <Label>Status: </Label>
                <Select options={project_status_filter_option}
                 name="filter" 
                 onChange={this.handleProjectStatusFilter.bind(this)}
                 value={this.state.project_status}
                 />


                <Label>What Kind of project?</Label>
                <Select options={project_type}
                 name="filter" 
                 onChange={this.handleProjectType.bind(this)}
                 value={this.state.project_type_value}
                 />

                 {this.state.isHourlySet && <div><Label>Per Hour:  <b style={{ color: 'red' }}>*</b></Label>
                <InputText
                    type="number"
                    id="per_hour"
                    value={per_hour}
                    onChange={(e) => this.handleChange(e)}
                />
                

               <Label>No of Hours:  <b style={{ color: 'red' }}>*</b></Label>
                <InputText
                    type="number"
                    id="no_of_hour"
                    value={no_of_hour}
                    onChange={(e) => this.handleNoOfHours(e.target.value)}
                />
              </div>
                 }

                <Label>Estimated Amount in $</Label>
                <InputText
                    type="number"
                    id="estimated_amount"
                    placeholder="Enter an amount"
                    disabled={this.state.isHourlySet}
                    value={this.state.estimated_amount}
                    onChange={(e) => this.handleChange(e)}
                />


                <Button onClick={this.handleInsertProject}>Add</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>

                        <ReactToPrint
                trigger={() => <a href="#">Print this out!</a>}
                content={() => this.componentRef}
                />

        <ComponentToPrint ref={el => (this.componentRef = el)} />
            </Wrapper>
        )
    }
}

export default RegisterProject