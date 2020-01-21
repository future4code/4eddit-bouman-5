const initialState = {
    allPosts: [],
    selectedPostId: "",
}

const posts = (state = initialState, action) => {
    switch( action.type ) {
        case "GET_POSTS_ACTION":
            return { ...state, allPosts: action.payload.posts}

        case "GET_POST_DETAIL_ACTION":
            return  { ...state, selectedPostId: action.payload.postId}

        default:
            return state
    }
}

export default posts;