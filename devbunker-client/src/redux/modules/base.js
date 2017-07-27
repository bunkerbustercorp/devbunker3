import { handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'; // 헤더 렌더링 여부 설정
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY'; // 유저 메뉴 렌더링 여부 설정

/* actions creator */
export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible
export const setUserMenuVisibility = createAction(SET_USER_MENU_VISIBILITY); // visible

/* initialState */
const initialState = Map({
    header: Map({
        visible: true
    }),
    userMenu: Map({
        visible: false
    })
});

/* reducer */
export default handleActions({
    [SET_HEADER_VISIBILITY]: (state, action) => {
        return state.setIn(['header', 'visible'], action.payload);
    },
    [SET_USER_MENU_VISIBILITY]: (state, action) => {
        return state.setIn(['userMenu', 'visible'], action.payload);
    }
}, initialState);