import React from 'react';
import { Helmet } from "react-helmet/es/Helmet";

import { Sigma, NodeShapes, Filter, RandomizeNodePositions, ForceAtlas2 } from 'react-sigma/lib/';
import Dagre from 'react-sigma/lib/Dagre'

import ForceNodeUpdate from "./components/ForceNodeUpdate"
import WordSummary from "./components/WordSummary";
// import NodeCreationForm from "./components/NodeCreationForm";

import GraphTutorial from "./components/GraphTutorial/index";
import FindWordData from "./components/FindWordData"

import { addNode, removeNode, updateNode, addGraphFilter, clearGraphFilter } from "../../actions/index";
import { connect } from "react-redux";
import { Icon } from 'semantic-ui-react';

class SigmaComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summaryVisible: false,
            nodeInfo: null,
            filter: this.props.dashboardGraphFilter.filter,
            treeLayout: false,
            findWordData: true
        }
    }

    // Open gallery/summary
    handleClickNode = (e) => {
        this.setState({
            summaryVisible: true, nodeInfo: e.data.node,
            dashboardComponents: e.data.node.dashboardComponents
        })
    }

    // Close summary (gallery)
    handleCloseNodeSummary = () => {
        this.setState({ summaryVisible: false, nodeInfo: null })
    }


    componentDidMount = () => {
        document.body.style.backgroundColor = "#000";
    }


    handleGraphLayoutChange = () => {
        this.setState({ treeLayout: !this.state.treeLayout })
    }


    render() {

        const { summaryVisible, newNodeDataInheritance, formVisible, hoverX, hoverY, addNodeVisible, treeLayout, hoveredNodePossibleChildren, findWordData } = this.state;
        const { displayedGraph } = this.props.dashboardGraph;
        const { filter, layout } = this.props.dashboardGraphFilter

        return (
            <div>
                <Helmet>
                    <title>Data Graph</title>
                </Helmet>

                <div id="sigma-wrapper">
                    {summaryVisible && this.state.nodeInfo ?
                        <WordSummary
                            treeLayout={this.state.treeLayout}
                            dashboardComponents={this.state.dashboardComponents}
                            closeModal={this.handleCloseNodeSummary}
                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            visible='true'
                            data={this.state.nodeInfo}></WordSummary>
                        :
                        null
                    }

                    <Sigma
                        renderer="canvas"
                        graph={displayedGraph}
                        onClickNode={this.handleClickNode}

                        // A list of other settings can be found here: https://github.com/jacomyal/sigma.js/wiki/Settings
                        settings={{

                            drawEdges: true,
                            edgeColor: "target",
                            drawEdgeLabels: true,
                            defaultEdgeLabelColor: "#d8d8d8",
                            minNodeSize: 5,
                            maxNodeSize: 30,
                            minEdgeSize: 5,
                            maxEdgeSize: 5,
                            clone: false,
                            verbose: false,
                            defaultNodeColor: "#ffffff",
                            borderSize: 2,
                            defaultNodeBorderColor: "#000",
                            defaultLabelColor: "#ffffff",
                            defaultLabelSize: 15,
                            defaultEdgeType: "dashed",
                            labelThreshold: 5,
                            font: "arial",
                        }}
                        style={{
                            width: "100vw",
                            position: "absolute",
                            height: "100vh"
                        }}
                    >
                        {findWordData ?
                            <Icon style={{ cursor: "pointer", position: 'absolute', top: "10px", left: "100px" }} onClick={() => this.setState({ findWordData: !findWordData })} size="large" link inverted name="low vision"></Icon>
                            :
                            <Icon style={{ cursor: "pointer", position: 'absolute', top: "10px", left: "100px" }} onClick={() => this.setState({ findWordData: !findWordData })} size="large" link inverted name="eye"></Icon>
                        }

                        <NodeShapes default="diamond" />

                        {!treeLayout ?
                            // RandomizeNodepOsitions is necessary for ForceAtlas to function
                            <RandomizeNodePositions>

                                <ForceAtlas2
                                    background
                                    easing="cubicInOut"
                                    iterationsPerRender={1}
                                    scalingRatio={1}
                                    scaleNodes={4}
                                    linLogMode
                                    timeout={1000}
                                    worker
                                    slowDown={1}
                                />
                            </RandomizeNodePositions>
                            :
                            <Dagre
                                //  Other node distributions: https://github.com/dunnock/react-sigma/blob/master/DOCS.md 
                                // Other Dagre documentation can be found here: https://github.com/dunnock/react-sigma/blob/master/src/Dagre.js
                                // Layout documentation: https://github.com/dagrejs/dagre/wiki#configuring-the-layout 
                                directed
                                compound
                                easing=""
                                // TB, BT, LR, or RL T=Top, B=Bottom, L=Left, R=Right, but currently set in REDUX store through the Layout settings in the GraphOptions component
                                rankDir={layout}
                                // Alignment for rank nodes. Can be UL, UR, DL, or DR, where U = up, D = down, L = left, and R = right.
                                // align='DL'

                                // deals with separation of nodes and edges (node is horizontal, rank is vertical)
                                nodesep="50"
                                edgesep="50"
                                ranksep="50"

                            />
                        }

                        {findWordData ? <FindWordData handleGraphLayoutChange={this.handleGraphLayoutChange} handleChangeFilter={this.handleChangeFilter}></FindWordData> : <></>}


                        <GraphTutorial />

                        {filter.id ?
                            <Filter
                                nodesBy={(node) => node.party === filter.party || node.id === "customer" || node.id === filter.id}
                            /> :
                            <Filter
                                nodesBy={(node) => node.party > 0 || node.id.length > 0 || node.id}
                            />
                        }

                        <ForceNodeUpdate nodes={displayedGraph.nodes} edges={displayedGraph.edges} />
                        <NodeShapes default="circle" />
                    </Sigma>
                </div>
            </div >
        )
    }
}

function mapStateToProps({ dashboardGraph, dashboardGraphFilter }) {
    return { dashboardGraph, dashboardGraphFilter };
}

const mapDispatchToProps = {
    addNode, removeNode, addGraphFilter, clearGraphFilter, updateNode
}

export default connect(mapStateToProps, mapDispatchToProps)(SigmaComponent);