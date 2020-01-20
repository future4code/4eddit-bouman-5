const initialState = {
    allPosts: []
}

const posts = (state = initialState, action) => {
    switch( action.type ) {
        case "SET_POSTS_ACTION":
            return { ...state, allPosts: action.payload.posts}
        default:
            return state
    }
}

export default posts;