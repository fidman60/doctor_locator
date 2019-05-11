export const CHANGE_CENTER = 'CHANGE_CENTER';

export function changeCenterAction(position) {
    return {
        type: CHANGE_CENTER,
        value: position
    };
}