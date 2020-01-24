import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { Statistic, Loader, Dimmer } from 'semantic-ui-react';


class SingleStatistic extends React.Component {
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

    render() {
        const { color } = this.props;
        const { data, loadingState } = this.state;
        return (
            <>
                {!loadingState ?

                    <Statistic inverted size='huge' color={color} style={{ height: '100%', marginTop: '5em' }}>
                        <Statistic.Value>{data.value}</Statistic.Value>
                        <Statistic.Label>{data.label}</Statistic.Label>
                    </Statistic> :
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                }
            </>
        )
    }
}

SingleStatistic.propTypes = {
    type: PropTypes.string,
    apiUrl: PropTypes.string
}

export default SingleStatistic;