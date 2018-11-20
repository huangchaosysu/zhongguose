import colors from '../comm/colors'

export default {
    namespace: 'zhongguose',

    state: {
        colors,
        current: 86,
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        }
        
    },
    effects: {
        *changeColor(action, {call, put}) {
            yield put({
                type: 'save',
                payload: {current: action.payload}
            })
        },
    },
}