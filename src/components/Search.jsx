import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';


const style = {
  'backgroundColor' : 'white',
  'position' : 'absolute',
  'margin' : '10px',
  'padding' : '2px',
  'paddingRight' : '10px',
  'paddingLeft' : '10px',
  marginLeft: 60,
  'zIndex' : 1000,
  'borderRadius' : '2px'
}
const conf = {text: 'navn', value: 'navn'}

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.search = this.search.bind(this);

  } 

  handleUpdateInput(value) {
    console.log(value);
    console.log(this);
    this.search(value);
  };
 
  search(value) {
    var context = this;
    return new Promise(function(resolve, reject) {

      fetch("https://api.trd.toptour.no/utno/turer/_search",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
              "from" : 0, "size" : 5,
              "_source": { 
              },
              "query" : {
                  "match" : { "attribs.navn" : value}
              }
          })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        context.setState({'dataSource' : json.hits.hits.map((hit) => { var res = hit._source.attribs; res.geom = hit._source.geom; return res; })});
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });

    });

  }

  onSelectItem(data, item) {
    console.log("SELECTITEM");
    this.props.onSelectRoute(data);
  } 

  filter() {
    return true;
  }

  render() {

    return (
        <AutoComplete
          style={style}
          hintText="Søk etter turer"
          dataSource={this.state.dataSource}
          dataSourceConfig={ conf } 
          onUpdateInput={this.handleUpdateInput}
          filter={this.filter}
          onNewRequest={this.onSelectItem}
        /> 
    );
  }
}
