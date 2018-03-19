import React from 'react';
const Proptypes = require('prop-types');

const styles = {
    content: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2em'

    }
}
class Loading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            dot: ''
        }
    }
    componentDidMount() {
        var stopper = '...'
        console.log('stopper', stopper)
        this.interval = window.setInterval(function () {
            if (this.state.dot === stopper) {
                this.setState(function () {
                    return {
                        dot: ''
                    }
                })
            } else {
                this.setState(function (prevState) {
                    return {
                        dot: prevState.dot + '.'
                    }
                })
            }
        }.bind(this), this.props.speed)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return (
            <div style={styles.content}>
                <p>
                    {this.state.text}
                </p>
                <h6>{this.state.dot}</h6>
            </div>
        )
    }
}

Loading.propTypes = {
    text: Proptypes.string.isRequired,
    speed: Proptypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 200
}

module.exports = Loading;