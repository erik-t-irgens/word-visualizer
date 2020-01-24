import React from 'react';
import handleBuildComponent from "../../../../../utilities/buildDashboardComponents";
import ComponentWrapper from "../../../../../SharedComponents/ComponentWrapper";
import { Transition, Segment } from "semantic-ui-react"

const GallerySlide = (props) => {

    const { component, centerVisible, animationDirection } = props;
    const duration = 200
    return (

        <Transition visible={centerVisible} animation={animationDirection} duration={duration}>
            <Segment basic>
                <ComponentWrapper type={component.type} title={component.name} card>
                    {handleBuildComponent(component)}
                </ComponentWrapper >
            </Segment>
        </Transition>
    )
}
export default GallerySlide;