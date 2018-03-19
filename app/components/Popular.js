import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from  '../utils/api';
import Loading from './Loading';

function SelectedLanguage(props) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <div>
            <ul className="languages">
                {languages.map(lang => (
                    <li style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={ () => props.onSelect(lang)}
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
            {props.repos.map(({name,html_url,stargazers_count, owner}, index) => (
                <li key={name} className='popular-item' >
                    <div className='popular-rank'>
                        #{index + 1}
                    </div>
                    <ul className='space-list-items'>
                        <li>
                            <img className='avatar'
                                src={owner.avatar_url}
                                alt={`Avatar for  ${owner.login}`} />
                        </li>
                        <li><a href={html_url}>{name}</a></li>
                        <li>@{owner.login}</li>
                        <li>{stargazers_count} stars</li>
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
        fetchPopularRepos(lang).then(repos => {
            this.setState(() => ({ repos }));
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
export default Popular;