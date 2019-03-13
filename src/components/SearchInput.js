import React from 'react';
import {connect} from 'react-redux'
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import {searchIfNeeded} from 'actions/SearchInputAction'
import { withRouter } from 'react-router-dom'


const mapStateToProps = (state) => {
  return {
    searchString: state.searchString                                        
  }
}

const mapDispatchToProps = { searchIfNeeded }


const SearchInput = withRouter(({searchIfNeeded, history}) => {
  let input;
  return (
    <Form inline className="cr-search-form" 
      onSubmit={e => {
        e.preventDefault();
        let searchTerm = input.value.trim();
        if (!searchTerm) {
          return
        }
        history.push('/search')
        searchIfNeeded(searchTerm);
      }}
      >
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        innerRef ={node => (input = node)}
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
    </Form>
  );
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
