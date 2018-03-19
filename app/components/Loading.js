import React from 'react';
import PropTypes from 'prop-types';

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
        const stopper = '...'
        this.interval = window.setInterval(() => {
                        this.state.dot === stopper ?  this.setState(() => ({dot: '' }))
                        : this.setState((prevState)=>({dot: prevState.dot + '.'}))            
        }, this.props.speed)
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
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 200
}

export default Loading;