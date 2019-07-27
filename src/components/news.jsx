import React, { Component } from 'react';

import Title  from './Title/Title';
import NewsPost from './NewsPost/NewsPost';
import Input from './Input/Input';
import Select from './Select/Select';
import Pagination from './Pagination/Pagination';


const BASE_PATH = 'https://hn.algolia.com/api/v1';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';
const PAGE_HITS = 'hitsPerPage=';
const PAGE_PARAM = 'page=';

const HITS = [
    {
        value: 10,
        label: 10
    },
    {
        value: 20,
        label: 20
    },
    {
        value: 30,
        label: 30
    },
    {
        value: 40,
        label: 40
    },
]

class News extends Component {
    state = {
        searchQuery: '',
        result: {},
        hitsPerPage: 20,
        page: 0
    }

    componentDidMount() {
        const { searchQuery, hitsPerPage, page } = this.state;
        this.fetchData(searchQuery, hitsPerPage, page);
        
    }

    fetchData(searchQuery, hitsPerPage, page) {
        fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}&${PAGE_HITS}${hitsPerPage}&${PAGE_PARAM}${page}`)
            .then(res => res.json())
            .then(result => this.setNews(result))
            .catch(error => error);
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            searchQuery: value
        })
    }

    getSearch = ({ key }) => {
        if (key === 'Enter'){
            const { searchQuery, hitsPerPage } = this.state;
            this.setState({
                page: 0
            })
            this.fetchData(searchQuery, hitsPerPage);
        }
    }
    
    setNews(result) {
        console.log(result);
        this.setState({ result });
    }

    handleHitChange({ target: { value } }) {
        const { searchQuery } = this.setState;

        this.setState({
            hitsPerPage: +value,
            page: 0
        }, () => {
            this.fetchData(searchQuery, this.state.hitsPerPage, 0);
        })
    }

    handlePageChange = ({ target }) => {
        const btnType = target.getAttribute('data-name');
        let { page } = this.state;

        switch(btnType) {
            case 'next':
                this.updatePage(page + 1);
                break;
            case 'prev':
                this.updatePage(page - 1);
                break;
            default: 
                return null;
        }
    }

    updatePage(number) {
        const { searchQuery, hitsPerPage } = this.state;
        this.setState({
            page: number
        }, () => {
            this.fetchData(searchQuery, hitsPerPage, number);
        })
    }

    render() {
        const { searchQuery, result, hitsPerPage } = this.state;
        const { hits = [], page, nbPages } = result;

        return (
            <div className="wrapper">
                <Title title="Hacker News" />
                <Select options={HITS} handleChange={this.handleHitChange} value={hitsPerPage} />
                <Pagination 
                    onClick={this.handlePageChange}
                    page={this.state.page}
                    lastPage={nbPages}
                    />
                <Input onKeyPress={this.getSearch} onChange={this.handleInputChange} value={searchQuery} />
                <ul className="newsList">
                    {hits.map( ({author, created_at, num_comments, objectID, title, points, url }) =>
                        <NewsPost
                            key={objectID}
                            author={author}
                            created_at={created_at}
                            num_comments={num_comments}
                            title={title}
                            points={points}
                            url={url}
                        />    
                    )}
                </ul>
            </div>
        );
    }
}

export default News;