export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const LOGIN = "LOGIN";

const initialState = {
  email: "",
  password: ""
};

export default function authReducer(state = initialState, payload) {
  switch (payload.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: payload.password,
      };

    case LOGIN: {
      return {
        ...state,
        email: payload.email,
        password: payload.password,
        authenticated: true
      };
    }

    default:
      return state;
  }
}
