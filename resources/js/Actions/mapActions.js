export const CHANGE_CENTER = 'CHANGE_CENTER';
export const SET_IN_BOUNDS_MARKERS = 'SET_IN_BOUNDS_MARKERS';
export const SET_MARKERS = 'SET_MARKERS';

export function changeCenterAction(position) {
    return {
        type: CHANGE_CENTER,
        value: position
    };
}

export function markersAction(type,value) {
    return {
        type: type,
        value: value
    };
}