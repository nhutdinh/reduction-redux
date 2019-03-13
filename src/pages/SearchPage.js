import React from 'react'
import Page from 'components/Page'
import {connect} from 'react-redux'
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Row,
    Spinner
  } from 'reactstrap';
import { NavLink } from 'react-router-dom';
class SearchPage extends React.Component{
    render(){
        const themes = ['', 'top', 'left', 'right'];
        const visibilityState  = this.props.isFetching ? "visible" : "hidden";
        const items = this.props.quotes && this.props.quotes.length > 0 ? this.props.quotes.map((it, index) => {
            const color = themes[index%4];
            console.log(color);
            var visibilityState  = it.isLoading ? "visible" : "hidden";
            const tags = it.tags ? it.tags.map(tag =>{
                return `#${tag}`;
            }) : '';
            return( 
                    <Col key={index} md={4} sm={4} xs={12} className="mb-3">
                        <Card
                        inverse
                        className={`border-0 bg-gradient-theme${
                            !!color ? '-' : ''
                        }${color}`}
                        >
                        <Spinner style={{visibility: visibilityState}} size="sm" color="primary" />{' '}
                        <CardBody className="d-flex flex-column justify-content-start align-items-start">
                            <CardTitle>{it.data.symbol}</CardTitle>
                            <CardText>{it.data.companyName}</CardText>
                            <CardText>{it.data.description}</CardText>
                        </CardBody>

                        <CardBody className="d-flex justify-content-between align-items-center">
                            <CardText>CEO: {it.data.CEO}</CardText>
                            <CardText>Exchange: {it.data.exchange}</CardText>
                            <CardText>Industry: {it.data.industry}</CardText>
                            <CardText>Issue Type: {it.data.issueType}</CardText>
                            <CardText>Sector: {it.data.sector}</CardText>
                            <CardText>Tags: {tags}</CardText>
                            
                            
                        </CardBody>
                        <CardBody>
                            <NavLink to={"/stock/" + it.data.symbol}>
                                <Button outline color="light">
                                Click
                                </Button>
                            </NavLink>
                        </CardBody>
                        </Card>
                    </Col>
                )
        }) : <Col className="text-center" md={12}>No Data</Col>;
        return (
            <Page className="search-page">
                <Row>
                    <Spinner style={{visibility: visibilityState}} size="sm" color="primary" />{' '}
                    {items}
                </Row>
            </Page>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      searchString: state.search.searchString,
      quotes: state.search.quotes,
      isFetching: state.search.isFetching                                        
    }
  }
  
  
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)