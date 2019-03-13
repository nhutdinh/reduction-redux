import React from 'react'
import Page from 'components/Page'
import {connect} from 'react-redux'
import {
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Row,
  Table,
  Col,
  Spinner
  } from 'reactstrap';
import {onDropdownSelected} from 'actions/StockPageAction'
class StockPage extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }
    componentDidMount(){
        const {match: { params }} = this.props
        this.props.onDropdownSelected('1m', params.stockquote);
    }
    render(){
        const { match: { params } } = this.props;

        const dropdownItems = ['1m', '2m', '3m'].map(it=>{
            return <div key={it} onClick={()=>{this.toggle(); this.props.onDropdownSelected(it, params.stockquote)}}>{it}</div>
        })
        const datas = this.props.quotesHistoryData ? this.props.quotesHistoryData.map((it,index)=>{
            return (
                <tr key={index}>
                    <td>{it.date}</td>
                    <td>{it.close}</td>
                </tr>
            )
        }): "No Data"
        const table = this.props.quotesHistoryData && this.props.quotesHistoryData.length > 0 ? 
                    (<Table default>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Close</th>
                        </tr>
                        </thead>
                        <tbody>
                            {datas}
                        </tbody>
                    </Table>) : "No data"
        var visibilityState  = this.props.isLoading ? "visible" : "hidden";
        return (
            <Page className="search-page">
                <Row>
                    <Col md={4} sm={4} xs={12}>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {this.props.selectedPeriod}
                            </DropdownToggle>
                            
                            <DropdownMenu>
                                {dropdownItems}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col md={8} sm={8} xs={12}>
                        {table}   
                        <Spinner style={{visibility: visibilityState}} size="sm" color="primary" />{' '}
                    </Col>
                </Row>
            </Page>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      selectedPeriod: state.quotesHistory.period,
      quotesHistoryData: state.quotesHistory.records,
      isLoading: state.quotesHistory.isLoading                                      
    }
  }
  
  
const mapDispatchToProps = {onDropdownSelected};

export default connect(mapStateToProps, mapDispatchToProps)(StockPage)