import {
  CREATE_CONTACTS,
  RETRIEVE_CONTACTS,
  UPDATE_CONTACTS,
  DELETE_CONTACTS,
} from "../actions/typesActions";

const intialstate = { loading: true, retreieve_data: [] };
function contactReducer(contacts = intialstate, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CONTACTS:
      return {
        ...contacts,
        retreieve_data: [...contacts.retreieve_data, payload],
      };

    case RETRIEVE_CONTACTS:
      return { ...contacts, retreieve_data: payload, loading: false };

    case UPDATE_CONTACTS:
      const index = contacts.retreieve_data.findIndex(
        (item) => item.id === payload.id
      );
      return {
        ...contacts,
        retreieve_data: contacts.retreieve_data.splice(index, 1, payload),
      };

    case DELETE_CONTACTS:
      return contacts.filter(({ id }) => id !== payload.id);

    default:
      return contacts;
  }
}

export default contactReducer;
