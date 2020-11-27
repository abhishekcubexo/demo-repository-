const user = {

}

const userReducer = (state = user, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.value
            }
        default: break;
    }
    return state;
}
export default userReducer