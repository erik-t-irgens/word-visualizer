import React from 'react';
import { Segment, Icon, Button, Form, Transition, Radio, Divider } from 'semantic-ui-react';
import TutorialSlide from "./components/TutorialSlide";
import GalleryButtons from "../ComponentGallery/components/GalleryButton";


class GraphTurorial extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSlide: 0,
            tutorialVisible: false,

        }
    }

    // Shows the options form itself
    handleShowTutorial = () => {
        this.setState({ tutorialVisible: !this.state.tutorialVisible })
    }

    delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

    handleChangeCurrentSlide = async (value) => {
        // Hide current slide
        if (value === 'increment') {
            this.setState({
                animationDirection: 'slide right',
                centerVisible: false,
            })
        } else if (value === 'decrement') {
            this.setState({
                animationDirection: 'slide left',
                centerVisible: false,
            })
        }

        // This will ensure that the animation has time to render before setting the state to display the next slide.
        await this.delay(200)

        // Render next/prev slide
        if (value === 'increment' && this.state.currentSlide < 7) {
            this.setState({
                animationDirection: "slide left",
                currentSlide: (this.state.currentSlide + 1),
                centerVisible: true,
            })
        } else if (value === 'decrement' && this.state.currentSlide > 0) {
            this.setState({
                animationDirection: "slide right",
                currentSlide: (this.state.currentSlide - 1),
                centerVisible: true,
            })
        }
    }


    render() {

        const { tutorialVisible, currentSlide, animationDirection, centerVisible } = this.state
        return (

            <div
                style={{
                    // position: 'absolute',
                    // right: "5%",
                    // top: '130px',
                    opacity: 1,
                    textAlign: 'center',
                    marginTop: "10px",
                    marginRight: '13vw',
                    marginLeft: '87vw',
                }}
            >
                <Button
                    color="grey"
                    inverted
                    size='mini'
                    animated='vertical'
                    // circular
                    style={{
                        textAlign: 'center'
                    }}
                    onClick={this.handleShowTutorial}>
                    <Button.Content hidden>Tutorial</Button.Content>
                    <Button.Content visible>
                        <Icon
                            name='help'>
                        </Icon>
                    </Button.Content>
                </Button>
                <Transition visible={tutorialVisible} animation="fade left" duration="300">
                    <Segment style={{
                        position: 'fixed',
                        right: '10vw',
                        top: '320px',
                        textAlign: 'center',
                        maxHeight: '70vh',
                        overflow: 'auto',
                        opacity: .9
                    }} inverted>

                        <TutorialSlide
                            centerVisible={centerVisible}
                            animationDirection={animationDirection}
                            currentPage={currentSlide}
                        />


                        <Divider></Divider>
                        <GalleryButtons
                            maxPage={4}
                            currentPage={currentSlide}
                            functionality={this.handleChangeCurrentSlide}></GalleryButtons>
                    </Segment>
                </Transition>


            </div >
        )
    }
}


export default GraphTurorial;