import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

// NOTE: This component is intended to wrap other components, giving them either a style or a size (such as a card, or grouped in a grid)

class ComponentWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,

        }
    }

    // Hides/Shows the component it is wrapping
    handleToggleChartVisibility = () => {
        this.state.visible ? this.setState({ visible: false }) : this.setState({ visible: true });
    }
    // Dictates what the icon should be through type
    handleComponentIcon = () => {
        const { type } = this.props;
        switch (type) {
            case 'linemark':
            case 'line': {
                return 'chart line';
            }
            case 'mark': {
                return 'circle';
            }
            case 'area': {
                return 'area graph'
            }
            case 'bar': {
                return 'chart bar';
            }

            case 'single-stat': {
                return 'info';
            }

            case 'list': {
                return 'numbered list'
            }
            case 'definition': {
                return 'book'
            }
            default: {
                // If unrecognized, return an X error icon.
                return 'x';
            }

        }
    }

    handlePrettifyTitle = () => (this.props.title[0].toUpperCase() + this.props.title.slice(1)).replace(/-/g, " ")

    render() {
        const { visible } = this.state;

        let iconName = visible ? 'triangle down' : 'triangle right';
        let iconColor = this.handleComponentIcon() === 'x' ? '#e8323e' : '#08b1e0';
        let overflow = this.props.type === 'news-feed' || this.props.type === 'grid-list' ? 'auto' : 'hidden';

        return (
            <>
                <div style={{ backgroundColor: '#242424', textAlign: 'center' }} textalign='center'>
                    <div style={{ cursor: 'pointer', backgroundColor: '#242424', textAlign: 'left' }} onClick={this.handleToggleChartVisibility}>
                        <div style={{ padding: '1em' }}>
                            <h5 style={{ color: 'white' }}>
                                <Icon style={{ color: 'white' }} name={iconName}>
                                </Icon>
                                <Icon style={{ color: iconColor }} name={this.handleComponentIcon()}>
                                </Icon>
                                {this.handlePrettifyTitle()}
                            </h5>
                        </div>

                    </div>

                    {visible ? <div style={{
                        // marginTop: 30
                        // ,
                        height: 300, overflow: overflow, scrollbarColor: 'red', backgroundColor: '#242424', textAlign: 'center'
                    }}> {this.props.children} </div> : null}
                </div>
            </>
        )
    }
}

ComponentWrapper.propTypes = {
    card: PropTypes.bool,
    type: PropTypes.string,
}

export default ComponentWrapper;