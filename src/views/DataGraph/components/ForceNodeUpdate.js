import React from 'react';
import _ from 'lodash';

class ForceNodeUpdate extends React.Component {

    // This checks the currently displayed nodes/edges (which are from sigma.graph), and compares them with the Redux store (when the store is updated). If there is a discrepency, the sigma graph is updated using its built-in addNode, addEdge, dropNode, and dropEdge functions, while also updating the Redux store with our own actions.
    componentWillReceiveProps({ sigma, nodes, edges }) {

        const nodes_sigma = sigma.graph.nodes().map(n => n.id) || []
        const edges_sigma = sigma.graph.edges().map(e => e.id) || []
        const edges_stored = edges.map(e => e.id) || []
        const nodes_stored = nodes.map(n => n.id) || []

        if (_.difference(edges_stored, edges_sigma).length > 0 || _.difference(nodes_stored, nodes_sigma).length > 0 || _.difference(edges_sigma, edges_stored).length > 0 || _.difference(nodes_sigma, nodes_stored).length > 0) {

            // NOTE: This is called FIRST purposefully. I drop the edges first, as I need to update their removed status in our store. Sigma automatically deletes Edges when a node is removed, and so I just forcefully remove them first here instead. That way, our store will contain the updated status of what is displayed. 
            if (edges_sigma.filter(n => !edges_stored.includes(n)).length > 0) {
                // REMOVE EDGE
                const edgeToRemove = edges_sigma.filter(n => !edges_stored.includes(n))
                if (edgeToRemove && edgeToRemove.length > 0) {
                    edgeToRemove.forEach(edge => sigma.graph.dropEdge(edge))
                }

            }

            if (nodes_sigma.filter(n => !nodes_stored.includes(n)).length > 0) {
                // REMOVE NODE
                const nodeToRemove = nodes_sigma.filter(n => !nodes_stored.includes(n))
                if (nodeToRemove && nodeToRemove.length > 0) {
                    nodeToRemove.forEach(node => sigma.graph.dropNode(node))
                }

            } else if (nodes_stored.filter(n => !nodes_sigma.includes(n)).length > 0) {
                //  ADD NODE
                const nodeToAdd = nodes.filter(n => !nodes_sigma.includes(n.id))
                if (nodeToAdd && nodeToAdd.length > 0) {
                    nodeToAdd.forEach(node => sigma.graph.addNode(node))
                }
            }

            if (edges_stored.filter(n => !edges_sigma.includes(n)).length > 0) {
                //  ADD EDGE
                const edgeToAdd = edges.filter(n => !edges_sigma.includes(n.id))
                if (edgeToAdd && edgeToAdd.length > 0) {
                    edgeToAdd.forEach(edge => sigma.graph.addEdge(edge))
                }
            }
        }
    }
    render = () => null
}

export default ForceNodeUpdate;