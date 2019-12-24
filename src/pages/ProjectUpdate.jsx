import React, { Component } from 'react'
import api from '../api'
import { PropTypes as pt } from 'prop-types'
import Select from 'react-select'
import styled from 'styled-components'

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
const InputCheck = styled.input.attrs({
    className: 'checkmark',
})`
    margin: 15px 15px 15px 5px;
    marginTop:15px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


class ProjectUpdate extends Component {

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
            id: this.props.match.params.id,
            client_name: '',
            project_name: '',
            project_brief: '',
            start_date: '',
            deadline_date: '',
            status: 0,
            address: '',
            estimated_amount: '',
            platform:{},
            languages: [],
        }
    }

    
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleUpdateClient = async () => {
        const { id,client_name, project_name, project_brief, address, start_date, deadline_date, estimated_amount, status,languages,platform } = this.state

       
        const payload = {client_name, project_name, project_brief, address, start_date, deadline_date, estimated_amount, status,languages ,platform}

        await api.updateClientById(id, payload).then(res => {
            window.alert(`Project Info updated successfully`)
            this.setState({
                client_name: '',
                project_name: '',
                project_brief: '',
                start_date: '',
                deadline_date: '',
                status: 0,
                address: '',
                estimated_amount: '',
                platform: {},
                languages: [],
                completed:0
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const info = await api.getClientById(id)

        console.log('info',info)

        this.setState(info.data.data)
        // this.setState({languages:info.data.data.languages})
    }
    handleMultipleSelect(value){
        console.log('multi',value)
        this.setState({languages:value})
    }

    handlePlatform(value){
        console.log('plat',value)
        this.setState({platform:value})
    }
    handleCheckChange(e){
       
    }


    render() {
        const { client_name, project_brief, project_name, start_date, deadline_date, status, estimated_amount,platform,languages } = this.state
        const languages_super_set = [
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

       
        
        return (
            <Wrapper>
                <Title>Update Info</Title>

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
                    value={languages}
                    isMulti
                    name="languages"
                    options={languages_super_set}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={this.handleMultipleSelect.bind(this)}
                />



                <Label>Estimated Amount in $</Label>
                <InputText
                    type="text"
                    id="estimated_amount"
                    placeholder="Enter an amount"
                    value={estimated_amount}
                    onChange={(e) => this.handleChange(e)}
                />

                <Label>Completed</Label>
                <InputCheck
                    type="checkbox"
                    id="completed_status"
                    placeholder="Enter an amount"
                    onChange={this.handleCheckChange.bind(this)}
                />
                <br />
                <Button onClick={this.handleUpdateClient}>Update </Button>
                <CancelButton href={'/registerclient'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default ProjectUpdate