import {CHANGE_CENTER} from '../../Actions/mapActions';

const initialState = {
    position: {
        lat: 46.227638, lng: 2.213749000000007,
    },
    zoom: 5,
};

export default function mapCenterReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CENTER:
            return {
                position: action.value,
                zoom: 14
            };
        default:
            return state;
    }
}