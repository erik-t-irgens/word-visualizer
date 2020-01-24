import React from 'react';
import { Transition, Segment, Icon, Button, Form, Radio } from "semantic-ui-react"


const handleBuildTutorialSlide = (pageNumber) => {
    let styling = { width: '500px', color: 'white', textAlign: 'center' }
    let segmentStyling = { height: '370px', textAlign: 'left', backgroundColor: '#242424', color: 'white' }
    switch (pageNumber) {
        case 0:
            return (
                <div style={styling} >
                    <h3>Overview</h3>

                    <Segment style={segmentStyling}>
                        <p>This graph is representative of all the words associated with what you searched.</p>
                        <p>There are four main data sources available.</p>
                        <ul>
                            <li>Synonyms</li>
                            <li>Antonyms</li>
                            <li>Associated</li>
                            <li>Rhymes</li>
                        </ul>

                        <p>Synonyms are words that are similar in definition</p>
                        <p>Antonyms are words that are opposite in definition</p>
                        <p>Assoicated words are related to the searched term statistically in the same piece of text. ( cow => milking )</p>
                        <p>Rhymes are words that share ending consonant and vowel pairs, and also share pronunciation.</p>
                    </Segment>
                </div>
            )
            break;
        case 1:
            return (
                <div style={styling} >
                    <h3>Adding Nodes</h3>
                    <Segment style={segmentStyling}>
                        <p>First, search for a term in the Search Term section of the header. Type in a single word, then either hit enter, or click 'Search'.</p>

                        <p>A new modal will appear, labeled 'Add Nodes'. Below are available words in respective categories. Clicking the <Icon style={{ cursor: 'pointer', color: 'green' }} name="plus"></Icon> icon will add that category's words into the graph below.</p>

                        <p>You may adjust the number of results that you will receive using the 'Result Limit' slider adjascent to the 'Search Term' column.</p>
                        <p><em>Be careful when setting your result limits. The higher your limit, the more densely populated the graph can become - making it more difficult to read. </em></p>
                    </Segment>
                </div>
            )
            break;
        case 2:
            return (
                <div style={styling} >
                    <h3>Viewing the Graph</h3>
                    <Segment style={segmentStyling}>
                        <p>What you see are nodes (points) connected by edges (lines). Each node represents data, and has metrics associated with them.</p>

                        <p>Zooming in further will allows for you to see the names of each node </p>

                        <p>Each node can be inspected further by hovering over it, and then clicking on it. This will bring up a summary modal that displays more information - such as definition, populatiry, part of speech, pronunciation, and syllable count.</p>
                    </Segment>
                </div>
            )
            break;
        case 3:
            return (
                <div style={styling} >
                    <h3>Removing Nodes</h3>
                    <Segment style={segmentStyling}>
                        <p>You can delete a node if the current layout is set to Tree layout display.</p>

                        <p>While viewing a node's summary, you can see there is a <Button color="red" inverted size='mini'><Icon name='x'></Icon> Delete</Button> at the bottom.</p>

                        <p>Clicking this button will prompt you to confirm the deletion of the currently selected node.</p>

                        <p><b>Deleting a node will also delete any children (nodes that are connected to this node), their children, and so on.<em> Be careful when deleting a node.</em></b></p>
                    </Segment>
                </div>
            )
            break;
        case 4:
            return (
                <div style={styling} >
                    <h3>Further Options</h3>
                    <Segment style={segmentStyling}>
                        <p>In the right-most column, there is a 'Layout' section. Within this column, you can change the layout of the displayed graph from a gravitationally computed graph (known as Force Atlas layout) to a tree layout (known as a Dagre layout). </p>

                        <p>Clicking this slider will toggle between each of these layouts: </p>

                        <div style={{
                            position: "relative",
                            left: "50%",
                            transform: "translate(-50%)",
                        }}>
                            <label style={{ color: 'white' }}>Switch Layout</label>
                            <Icon name="fork"></Icon>
                            <Radio
                                slider
                                name='editModeToggle'
                                checked={false}
                            />
                            <Icon name="tree"></Icon>
                        </div>

                        <p> While the graph is in the Tree Layout, you have access to these buttons:</p> <Button.Group style={{
                            position: "relative",
                            left: "50%",
                            transform: "translate(-50%)",
                        }}>
                            <Button size='mini' inverted icon='arrow down' />
                            <Button size='mini' inverted icon='arrow up' />
                            <Button size='mini' inverted icon='arrow right' />
                            <Button size='mini' inverted icon='arrow left' />
                        </Button.Group> <p> These buttons allow you to alter the direction of the Tree graph's orientation for your pleasure. </p>
                    </Segment>
                </div >
            )
            break;
        default:

    }
}

const TutorialSlide = (props) => {

    const { centerVisible, animationDirection, currentPage } = props;
    const duration = 200
    return (

        <Transition visible={centerVisible} animation={animationDirection} duration={duration}>
            <Segment basic>
                {handleBuildTutorialSlide(currentPage)}
            </Segment>
        </Transition>
    )
}
export default TutorialSlide;