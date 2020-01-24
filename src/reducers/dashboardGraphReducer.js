import { ADD_NODE, INIT_GRAPH, REMOVE_NODE, UPDATE_NODE } from "../actions/types";


// TODO: Generate these dynamically dependant on real data. 
const dashboardComponents = [
    {
        type: 'linemark',
        name: 'Name of the data',
        size: 20,
        apiUrl: 'db/getCWRedHunterParameterReducer',
        color1: '#8ac44f',
        color2: '#4caa1a',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,
    },

    {
        type: 'area',
        name: 'Name of the data',
        size: 8,
        apiUrl: 'db/getCWRedHunterReducer',
        color1: '#8ac44f',
        color2: '#4caa1a',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,
    },
    {
        type: 'bar',
        name: 'Name of the data',
        size: 8,
        apiUrl: 'db/getCWRedHunter',
        color1: '#c10f7c',
        color2: '#b43c7c',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,
    },
    {
        type: 'area',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },
    {
        type: 'line',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },
    {
        type: 'mark',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },
    {
        type: 'bar',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },


    {
        type: 'single-stat',
        name: 'Pages Scraped',
        apiUrl: 'db/getPagesScraped',
        size: 8,
        color: 'teal',
        color1: 'blue',
        color2: '',
    },

    {
        type: 'single-stat',
        name: 'Total Pages Scraped',
        apiUrl: 'db/getPagesScraped',
        size: 8,

    },



]

// For demonstration purposes only
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// The below intiialstate should be equal to a util, one that async fetches this list of nodes and edges. 

const initialState = {
    displayedGraph: {
        "nodes": [],
        "edges": []
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INIT_GRAPH: {
            state = {
                ...state,
                displayedGraph: {
                    nodes: [
                        action.payload.newNode.node
                    ],
                    edges: []
                }
            }
            break;
        }
        case ADD_NODE: {
            state = {
                ...state,
                displayedGraph: {
                    nodes: [
                        ...state.displayedGraph.nodes, action.payload.newNode.node
                    ],
                    edges: [
                        ...state.displayedGraph.edges, action.payload.newNode.edge
                    ],
                }
            };
            break;
        }
        case REMOVE_NODE: {
            state = {
                ...state,
                displayedGraph: {
                    nodes: [
                        ...state.displayedGraph.nodes.filter(node => node.id != action.payload.nodeToRemove.id)
                    ],
                    edges: [
                        ...state.displayedGraph.edges.filter(edge => edge.source != action.payload.nodeToRemove.id && edge.target != action.payload.nodeToRemove.id)
                    ],
                }
            };
            break;
        }
        case UPDATE_NODE: {
            state = {
                ...state,
                displayedGraph: {
                    nodes: [
                        ...state.displayedGraph.nodes.filter(node => !action.payload.updatedNodes.some(child => node.id === child.id)),
                        ...action.payload.updatedNodes
                    ],
                }
            };
            break;
        }
        default:
            return state;
    }

    return state;
}