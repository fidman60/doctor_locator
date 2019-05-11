import {CHANGE_CENTER, SET_IN_BOUNDS_MARKERS, SET_MARKERS} from '../../Actions/mapActions';

const initialState = {
    position: {lat: 46.227638, lng: 2.213749000000007},
    zoom: 5,
    markers: [],
    inBoundsMarkers: [],
};

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CENTER:
            return {
                ...state,
                position: action.value,
                zoom: 14
            };
        case SET_IN_BOUNDS_MARKERS:
            return {
                ...state,
                inBoundsMarkers: action.value,
            };
        case SET_MARKERS:
            return {
                ...state,
                markers: action.value,
            };
        default:
            return state;
    }
}