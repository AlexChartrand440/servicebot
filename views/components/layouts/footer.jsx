import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
let _ = require("lodash");
import consume from "pluginbot-react/src/consume"
class Footer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            systemOptions: this.props.options || {},
        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.options){
            this.setState({systemOptions: nextProps.options});
        }
    }

    render () {

        let footerBackgroundStyle = {};
        let footerTextStyle = {};
        if(this.state.systemOptions) {
            let options = this.state.systemOptions;
            footerBackgroundStyle.backgroundColor = _.get(options, 'primary_theme_background_color.value', '"You can set this heading in system options');
            footerTextStyle.color = _.get(options, 'primary_theme_text_color.value', "You can set this text in system options");
        }

        return (
            <div className="footer" style={footerBackgroundStyle}>
                <p className="powerby" style={footerTextStyle}>Powered by
                    <Link className="powerby-servicebot" target="_blank" to="http://www.servicebot.io" style={footerTextStyle}> servicebot.io</Link>
                </p>
                {this.props.services.footerComponent && this.props.services.footerComponent.map((comp, index) => {
                    console.log(comp);
                    return (<div>
                        {comp}
                    </div>)
                })}
            </div>
        );
    }
}

Footer = connect((state) => {return {options:state.options}})(Footer);
export default consume("footerComponent")(Footer)