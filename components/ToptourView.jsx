'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');  
var _ = require('underscore');

var ToptourView = React.createClass({

    componentWillUpdate: function(nextProps, nextState) {
        console.log(nextProps, "new");
    },

    componentDidUpdate: function() {

    },

    createMarkup: function(htmlString) { 
        return {__html: htmlString}; 
    },

    render: function() {
        console.log(this.props);
        var tt = this.props.selectedToptour;
        var d = createMarkup(tt.beskrivelse.replace('<br /> ', '<br/>'))
        return (<div className="toptour-view">
            <p>{tt.navn}</p>
            <div><p>F&oslash;rste etappen g&aring;r opp langs vannr&oslash;rene som ligger ved stien.&nbsp;N&aring;r man kommer opp i Risaskaret holder man til h&oslash;yre forbi varden med sikte p&aring; Bergehornet og etterhvert vil du kunne se en svakt r&oslash;dmerket sti.<br /> For turen sin del holder man gjerne noe til h&oslash;yre opp p&aring; Kornfjellet, f&oslash;r man sikter p&aring; ryggen mot toppen.&nbsp;</p> <p>Dette er en utmerket hyggetur p&aring; stegjern, n&aring;r sn&oslash;en har lagt seg som ei iskappe p&aring; Sunnm&oslash;rsalpene. Luftig og bratt nok til at man kan skade seg ved utglidning, men fullt mulig &aring; g&aring; usikret. Fantastisk utsikt fra toppvarden mot Eoksundet i vest, Vartdalsfjorden rett under stegjerntaggene, og Sunnm&oslash;rdsalpene i s&oslash;r&oslash;st.</p></div>
            <div dangerouslySetInnerHTML={d} />


        </div>);
    }


});

module.exports = ToptourView;