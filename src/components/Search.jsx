import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

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
    this.search = this.search.bind(this);
  } 

  handleUpdateInput(value) {
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
                "includes" : ["attribs.navn"]
              },
              "query" : {
                  "term" : { "attribs.navn" : value}
              }
          })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        context.setState({'dataSource': json.hits.hits.map((hit) => { return hit._source.attribs.navn; }) });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });

    });

  }

  filter() {
    return true;
  }

  render() {
    
    return (
        <AutoComplete
          hintText="Søk etter turer"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          filter={this.filter}
        /> 
    );
  }
}
