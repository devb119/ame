export const actionType = {
  // Usage example
  // SET_DATA_GOOGLE_EARTH_ENGINE: 'SET_DATA_GOOGLE_EARTH_ENGINE',
  SET_NUMBER: "SET_NUMBER",
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    // Usage example:
    // case actionType.SET_DATA_GOOGLE_EARTH_ENGINE:
    //   return {
    //     ...state,
    //     dataGoogleEarthEngine: action.dataGoogleEarthEngine,
    //   };
    case actionType.SET_NUMBER:
      return {
        ...state,
        numberOfPosts: action.payload,
      };
    case actionType.SET_USER:
      return {
        ...state,
        userId: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
