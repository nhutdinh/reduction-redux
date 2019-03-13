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
class SearchPage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }
    render(){
        const themes = ['', 'top', 'left', 'right'];
        const items = this.props.quotes ? this.props.quotes.map((it, index) => {
            const color = themes[index%4];
            console.log(color);
            var visibilityState  = it.isFetching ? "visible" : "hidden";
            return( 
                    <Col key={index} md={4} sm={4} xs={12} className="mb-3">
                        <Card
                        inverse
                        className={`border-0 bg-gradient-theme${
                            !!color ? '-' : ''
                        }${color}`}
                        style={{
                            height: 200,
                        }}
                        >
                        
                        <Spinner style={{visibility: visibilityState}} size="sm" color="primary" />{' '}
                        <CardBody className="d-flex flex-column justify-content-start align-items-start">
                            <CardTitle>{it.data.symbol}</CardTitle>
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
                )
        }) : "";
        return (
            <Page className="search-page">
                <Row>
                    {items}
                </Row>
            </Page>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      searchString: state.searchString,
      quotes: state.quotes                                        
    }
  }
  
  
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)