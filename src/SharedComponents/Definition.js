import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { Header, Loader, Dimmer, Divider, Feed, Card } from 'semantic-ui-react';


class Definition extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loadingState: true,
        }
    }

    componentDidMount() {
        this.setState({ loadingState: false, data: this.props.data })

    }

    handleBuildDefinitionCard = (data) => {
        return data.map((definition, i) => (
            <>
                <Feed.Event key={i}>
                    <Feed.Label><Header inverted color={this.props.color}>{i + 1}</Header></Feed.Label>
                    <Feed.Content>
                        <Feed.Summary style={{ color: "white" }}>
                            {definition}
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
                <Divider inverted></Divider></>
        ))
    }

    render() {
        const { color } = this.props;
        const { data, loadingState } = this.state;
        return (
            <>
                {!loadingState ?
                    <div style={{ overflow: 'auto', height: '100%' }}>
                        <Card color={this.props.color} style={{ backgroundColor: "#242424", width: "100%", boxShadow: "2px 2px 2px " + this.props.color }} >
                            <Card.Content>
                                <Card.Header style={{ color: "white" }}>{data.word}</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed inverted>
                                    {this.handleBuildDefinitionCard(data.definition)}
                                </Feed>
                            </Card.Content>
                        </Card>
                    </div> :
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>

                }
            </>
        )
    }
}

Definition.propTypes = {
    type: PropTypes.string,
    apiUrl: PropTypes.string
}

export default Definition;
