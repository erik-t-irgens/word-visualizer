import React from 'react';
import { Divider, Icon, Segment } from 'semantic-ui-react';
import ComponentGallery from "./ComponentGallery/index";
import DeleteModal from "../../../SharedComponents/deleteModal";
import { addNode, removeNode } from "../../../actions/index";

import { connect } from "react-redux";

// When clicking a node, the NodeSummary is a modal with pertinent information described to the selected node.
class NodeSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            loadingState: true,
            data: "",
            dashboardComponents: []
        }
    }

    // This function also deletes child nodes and edges.
    handleDeleteNode = (incomingNode) => {
        const edgesToRemove = this.props.dashboardGraph.displayedGraph.edges.filter(edge => edge.source === incomingNode.id)
        let nodesToRemove = []
        edgesToRemove.forEach(edge => nodesToRemove = [...nodesToRemove, ...this.props.dashboardGraph.displayedGraph.nodes.filter(node => node.id === edge.target)])
        this.props.removeNode(incomingNode)
        if (nodesToRemove.length > 0) {
            nodesToRemove.forEach(node => this.handleDeleteNode(node))
        }
        this.props.closeModal()
    }

    componentDidMount = () => {

        this.setState(
            {
                visible: this.props.visible,
                data: this.props.data,
                treeLayout: this.props.treeLayout
            }
        )
    }

    render() {

        const { data, treeLayout } = this.state;
        return (
            < Segment inverted style={{
                position: "fixed",
                zIndex: 2,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }}
            >
                <div
                    id="nodeSummary"
                    style={{ width: '60vw', textAlign: 'center' }}
                >
                    <Icon name="x" style={{ cursor: "pointer", right: 10, top: 10, position: 'absolute' }} onClick={this.props.closeModal} />
                    {data.party ?
                        <h3>{data.label} - Party {data.party}</h3>
                        : <h3>{data.label}</h3>
                    }

                    <Divider horizontal />
                    <ComponentGallery data={this.props.dashboardComponents}></ComponentGallery>
                    {data.id != 'customer' && treeLayout ?
                        <>
                            <Divider />
                            <DeleteModal
                                style={{ margin: '20px' }}
                                type="node" title={"Delete " + data.label + "?"}
                                handleDelete={() => this.handleDeleteNode(data)}
                            />
                        </> :
                        null}
                </div>
            </Segment>
        )
    }
}

function mapStateToProps({ dashboardGraph }) {
    return { dashboardGraph };
}

const mapDispatchToProps = {
    addNode, removeNode
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeSummary);