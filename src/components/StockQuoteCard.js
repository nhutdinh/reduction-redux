import React from 'react';
import {connect} from 'react-redux'
import { MdSearch } from 'react-icons/md';
import { Form, Input, Button } from 'reactstrap';
import {searchIfNeeded} from 'actions/StockQuoteCardAction'

const mapStateToProps = (state) => {
  return {
    searchString: state.searchString                                        
  }
}


const mapDispatchToProps = { searchIfNeeded }


const StockQuoteCard = ({searchIfNeeded}) => {
  let input;
  return (
    <Col key={this.props.index} md={4} sm={4} xs={12} className="mb-3">
        <Card
        inverse
        className={`border-0 bg-gradient-theme${
            !!this.props.color ? '-' : ''
        }${this.props.color}`}
        style={{
            height: 200,
        }}
        >
        <Spinner size="sm" color="primary" />{' '}
        <CardBody className="d-flex flex-column justify-content-start align-items-start">
            <CardTitle>{this.props.quote.title}</CardTitle>
            <CardText>card text</CardText>
        </CardBody>

        <CardBody className="d-flex justify-content-between align-items-center">
            <CardText>Karl David</CardText>
            <Button outline color="light">
            Click
            </Button>
        </CardBody>
        </Card>
    </Col>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(StockQuoteCard)
