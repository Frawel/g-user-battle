var React = require('react');



var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Popular = require('./Popular');

import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

const NotFound = ({match}) => (<div>
   {`Not Found page ${match.Url} sorry`}
</div>)

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/popular' component={Popular} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route component = {NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
module.exports = App;