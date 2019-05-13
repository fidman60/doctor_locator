export const CHANGE_CENTER = 'CHANGE_CENTER';
export const SET_IN_BOUNDS_MARKERS = 'SET_IN_BOUNDS_MARKERS';
export const SET_MARKERS = 'SET_MARKERS';
export const SET_CENTER_AND_CURRENT_PLACE = 'SET_CENTER_AND_CURRENT_PLACE';
export const FILTER_OPHTHO = 'FILTER_OPHTHO';
export const SET_FILTER_OPHTHO_AND_BOUNDS = 'SET_FILTER_OPHTHO_AND_BOUNDS';
export const CALL_GET_BOUNDS_FUNC = 'CALL_GET_BOUNDS_FUNC';

export function changeCenterAction(position) {
    return {
        type: CHANGE_CENTER,
        value: position
    };
}

export function changeCenterAndCurrentPlace(value) {
    return {
        type: SET_CENTER_AND_CURRENT_PLACE,
        value: value
    }
}

export function markersAction(type,value) {
    return {
        type: type,
        value: value
    };
}

export function filterOptions(value) {
    return {
        type: FILTER_OPHTHO,
        value: value,
    };
}

export function filterOptionsWithBounds(value) {
    return {
        type: SET_FILTER_OPHTHO_AND_BOUNDS,
        value: value,
    }
}

export function callGetBoundsFuncAction(value) {
    return {
        type: CALL_GET_BOUNDS_FUNC,
        value: value,
    }
}