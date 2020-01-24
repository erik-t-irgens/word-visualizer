import {
    ADD_NODE, REMOVE_NODE, UPDATE_NODE,
    ADD_GRAPH_FILTER, CLEAR_GRAPH_FILTER, CHANGE_LAYOUT_DIRECTION, TOGGLE_LABEL_VISIBILITY, INIT_GRAPH
} from './types';

// DASHBOARD GRAPH ALTERATION

export const addNode = (newNode) => ({
    type: ADD_NODE,
    payload: { newNode }
})

export const initGraph = (newNode) => ({
    type: INIT_GRAPH,
    payload: { newNode }
})

export const removeNode = (nodeToRemove) => ({
    type: REMOVE_NODE,
    payload: { nodeToRemove }
})

export const updateNode = (updatedNodes) => ({
    type: UPDATE_NODE,
    payload: { updatedNodes }
})

// DASHBOARD GRAPH FILTERS

export const addGraphFilter = (newFilter) => ({
    type: ADD_GRAPH_FILTER,
    payload: { newFilter }
})

export const clearGraphFilter = (clearedFilter) => ({
    type: CLEAR_GRAPH_FILTER,
    payload: { clearedFilter }
})

export const changeLayoutDirection = (newLayout) => ({
    type: CHANGE_LAYOUT_DIRECTION,
    payload: { newLayout }
})

export const toggleLabelVisibility = (labelVisibility) => ({
    type: TOGGLE_LABEL_VISIBILITY,
    payload: { labelVisibility }
})