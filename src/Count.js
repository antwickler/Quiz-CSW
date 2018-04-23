import React, { Component } from 'react';
import axios from 'axios'; 

const URL = 'http://localhost:8888/api/';

class Count extends Component {
    constructor(props){
        super(props)
          this.state = {
            counts: [], 
            id: 0, name: 'SINGAPORE',
            newId: 0, newName: '',
        } 
    }

    componentDidMount() {
        this.getAllCounts() 
    }
    
    getAllCounts() {
        axios.get(`${URL}/counts`)
            .then(res => {
                    this.setState({counts: res.data})
                    console.log(res.data)
                }
            )
            .catch( (error) => { console.log(error); })
    }

    renderCounts() {
        return this.state.counts.map( (count,index) => {
            if (count !== null )
                return (                
                        <li  key={count.id}>
                            {count.id}. {count.name} &nbsp;&nbsp;
                            <button onClick={() => this.deleteCount(index)}>delete</button>
                        </li>
                )
            return ('')
        })
    }

    deleteCount(id) {       
        axios.delete(`${URL}/count/${id}`)
            .then( (res) => {
                console.log('Delete:' + res)
                this.getAllCounts()  
            })
    }

    addCount = (e) => {
            e.preventDefault() 
            axios.post(`${URL}/counts`,   {                
                name: this.state.name            
            })
                .then( (res) => {
                console.log('Create a new count: ' + res);
                this.getAllCounts()  
            })
    }

    getCount(id) {        
        axios.get(`${URL}/count/${id}`)
            .then( (res) => {
                const {name} = res.data
                console.log( res.data)
                this.setState({ newId: id, newName: name })
                console.log(this.state)
            })
    }

    editCount = (e) => {      
        e.preventDefault()  
        axios.put(`${URL}/count/${this.state.newId}`, {
                name: this.state.newName
                })
            .then( (response) => {
                console.log('Create a new count: ' + response);
                this.getAllCounts()  
            })            
    }    

    handleChange = (e) =>  {
        const {name, value} = e.target 
        this.setState({[name]:value})
    }

    render() {
        return (
            <div>
                <h2> Country</h2>
                <ul>
                    {this.renderCounts()}
                </ul>

                <h2>Add country</h2>
                <form onSubmit={this.addCount}>
                <input type="text" name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange} />
                   
                <button>Submit</button>
                </form>
            </div>
        );
    }

}

export default Count;