import {
    ADD_GRAPH_FILTER, CLEAR_GRAPH_FILTER, CHANGE_LAYOUT_DIRECTION, TOGGLE_LABEL_VISIBILITY
} from "../actions/types";


const initialState = {
    filter: {
        party: null,
        id: null,
    },
    layout: 'TB',
    labelView: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GRAPH_FILTER: {
            state = {
                ...state,
                filter: {
                    party: action.payload.newFilter.filter.party,
                    id: action.payload.newFilter.filter.id,
                }
            };
            break;
        }
        case CLEAR_GRAPH_FILTER: {
            state = {
                ...state,
                filter: {
                    party: action.payload.clearedFilter.filter.party,
                    id: action.payload.clearedFilter.filter.id,
                }
            };
            break;
        }
        case CHANGE_LAYOUT_DIRECTION: {
            state = {
                ...state,
                layout: action.payload.newLayout,
            }
            break;
        }
        case TOGGLE_LABEL_VISIBILITY: {
            state = {
                ...state,
                labelView: action.payload.labelVisibility,
            }
            break;
        }
        default:
            return state;
    }

    return state;
}