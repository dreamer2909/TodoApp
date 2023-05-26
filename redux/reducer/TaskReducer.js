export const ADD_TASK = "ADD_TASK";
export const GET_TASK = "GET_TASK";
export const UPDATE_PROGRESS_TASK = "GET_PROGRESS_TASK";
export const DELETE_COMPLETED_TASK = "DELETE_COMPLETED_TASK";

const initialState = {
  tasks: [],
};

export default function taskReducer(state = initialState, payload) {
  switch (payload.type) {
    case GET_TASK:
      return {
        ...state,
        tasks: payload.tasks,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload.task],
      };

    case UPDATE_PROGRESS_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === payload.id ? {...task, completed: true} : task)
      };

    case DELETE_COMPLETED_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload.id)
      };

    default:
      return state;
  }
}
