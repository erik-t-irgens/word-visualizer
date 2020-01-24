import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { Statistic, Loader, Dimmer, Table } from 'semantic-ui-react';


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

    handleBuildTable = (data) => {
        return data.map((word, i) => (
            < Table.Row key={i} >
                <Table.Cell>{word.word}</Table.Cell>
                <Table.Cell>{word.score}</Table.Cell>
                {word.definition ? <Table.Cell>{word.definition}</Table.Cell> : <Table.Cell>"No definition available"}</Table.Cell>}

            </Table.Row >
        ))
    }

    render() {
        const { color } = this.props;
        const { data, loadingState } = this.state;
        return (
            <>
                {!loadingState ?
                    <div style={{ overflow: 'auto', height: '100%' }}>
                        <Table inverted celled padded color={color} style={{ overflow: 'auto' }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell singleLine>
                                        Word
                                </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Rating
                                </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Definition
                                </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.handleBuildTable(data)}
                            </Table.Body>

                        </Table></div> :
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