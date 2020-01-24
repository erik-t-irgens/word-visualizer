import React, { Component, Fragment } from 'react';
import { Menu, Icon, Segment, Grid } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            size: 'scale(1.2)  translate(0px, 0px)',
            color: "null",
            leftActive: false,
            rightActive: false
        }
    }



    handleMouseEnter = () => {
        this.setState({
            size: 'scale(1) translate(0px, 0px)',
        })
    }

    handleMouseExit = () => {
        this.setState({
            size: 'scale(1.2)  translate(0px, 20px)',
        });
    }

    render() {

        const { size, color } = this.state
        return (

            <Segment inverted style={{ borderRadius: 0, backgroundColor: '#272d2d' }} icon='labeled'>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handeMouseExit}
                            width={8}
                            active={this.props.location.pathname.includes('/datagraph')}
                            link
                            style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', transition: 'transform 100ms', transform: size, backgroundColor: color }}
                        >
                            <h1
                                style={{ cursor: "pointer" }}
                                onClick={() => this.props.history.push('/datagraph/')}
                            >
                                <Icon name='dot circle' />
                                Data Graph
                            </h1>
                        </Grid.Column>
                        <Grid.Column
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handeMouseExit}
                            width={8}
                            name='Dashboard'
                            active={this.props && this.props.location.pathname.includes('/dashboard')}
                            link
                            style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', transition: 'transform 100ms', transform: size, backgroundColor: color }}
                        >
                            <h1
                                onClick={() => this.props.history.push('/dashboard/')}
                                style={{ cursor: "pointer" }}
                            >
                                <Icon name='area graph' />
                                Dashboard
                                    </h1>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}



export default withRouter(Header)