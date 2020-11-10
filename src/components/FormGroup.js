import React from 'react'

export default class FormGroup extends React.Component{
    render (){
        return (
            <div className="form-signin">
                <div className="form-label-group">                
                <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
                
                {this.props.children}
                </div>
            </div>
            
        )
    }
}