import React from 'react'


export default class Card extends React.Component {
    render() {
        return (
            <div className="card card-signin my-5" >
                <div className="card-body">
                    <h5 className="card-title text-center">{this.props.titulo}</h5>

                    {this.props.children}
                </div>
            </div>
        )
    }
}