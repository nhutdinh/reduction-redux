import React from 'react';
import {connect} from 'react-redux'
import { MdSearch } from 'react-icons/md';
import { Form, Input, Button } from 'reactstrap';
import {search} from 'actions/SearchInputAction'

const mapStateToProps = (state) => {
  return {
    searchString: state.searchString                                        
  }
}

const mapDispatchToProps = { search1: search }


const SearchInput = ({search1, searchString}) => {
  console.log(search1 )
  return (
    <div inline className="cr-search-form">
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Button onClick={search1}
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps  )(SearchInput)
