import React from 'react';


export default class RootError extends React.Component {
    render() {
        const { statusCode } = this.props;
        return (<div>{statusCode}</div>)
    }
}