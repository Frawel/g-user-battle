var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectedLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <div>
            <ul className="languages">
                {languages.map(lang => (
                    <li style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                ))}
            </ul>
        </div>
    )

}

function RepoGrid(props) {
    return (
        <ul className='popular-list'>
            {props.repos.map((repo, index) => (
                <li key={repo.name} className='popular-item' >
                    <div className='popular-rank'>
                        #{index + 1}
                    </div>
                    <ul className='space-list-items'>
                        <li>
                            <img className='avatar'
                                src={repo.owner.avatar_url}
                                alt={'Avatar for ' + repo.owner.login} />
                        </li>
                        <li><a href={repo.html_url}>{repo.name}</a></li>
                        <li>@{repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>
                    </ul>
                </li>
            ))

            }
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

SelectedLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}


class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount() {
        this.getPopularRepost();
    }

    getPopularRepost(lang = this.state.selectedLanguage) {
        api.fetchPopularRepos(lang).then(repos => {

            this.setState(() => ({ repos: repos }));
        });
    }

    updateLanguage(lang) {
        this.setState(() => ({ selectedLanguage: lang }));
        this.getPopularRepost(lang);
    }

    render() {
        return (
            <div>
                <SelectedLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} />

                {!this.state.repos ? <Loading speed={90} />
                    : <RepoGrid repos={this.state.repos} />}
            </div>)
    }
}

module.exports = Popular;