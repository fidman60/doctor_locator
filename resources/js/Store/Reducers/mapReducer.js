import {
    CHANGE_CENTER,
    SET_CENTER_AND_CURRENT_PLACE,
    SET_IN_BOUNDS_MARKERS,
    SET_MARKERS,
    FILTER_OPHTHO,
    SET_FILTER_OPHTHO_AND_BOUNDS,
    CALL_GET_BOUNDS_FUNC,
} from '../../Actions/mapActions';

const initialState = {
    position: {lat: 46.227638, lng: 2.213749000000007},
    zoom: 5,
    markers: [],
    inBoundsMarkers: [],
    currentPlace: undefined,
    filter: undefined,
    callGetExistingBoundsMarkers: false,
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
        case SET_CENTER_AND_CURRENT_PLACE:
            return {
                ...state,
                position: action.value,
                currentPlace: action.value,
                zoom: 14
            };
        case FILTER_OPHTHO:
            return {
                ...state,
                filter: action.value,
            };
        case SET_FILTER_OPHTHO_AND_BOUNDS:
            return {
                ...state,
                filter: action.value.filter,
                inBoundsMarkers: action.value.inBoundsMarkers,
            };
        case CALL_GET_BOUNDS_FUNC:
            return {
                ...state,
                callGetExistingBoundsMarkers: action.value,
            };
        default:
            return state;
    }
}