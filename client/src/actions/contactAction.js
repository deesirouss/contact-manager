import {
  CREATE_CONTACTS,
  RETRIEVE_CONTACTS,
  UPDATE_CONTACTS,
  DELETE_CONTACTS,
} from "./typesActions";

import {
  create,
  getContacts,
  update,
  remove,
} from "../services/ contactServices";

export const createContact =
  (name, phone, email, address, fav, image) => async (dispatch) => {
    const res = await create(name, phone, email, address, fav, image);
    dispatch({
      type: CREATE_CONTACTS,
      payload: res.data,
    });
    return res;
  };

export const updateContact = (id, data) => async (dispatch) => {
  try {
    const res = await update(id, data);
    dispatch({
      type: UPDATE_CONTACTS,
      payload: res.data,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const retrieveContacts = () => async (dispatch) => {
  try {
    const res = await getContacts();
    dispatch({
      type: RETRIEVE_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    return err;
  }
};

export const deleteContacts = (id) => async (dispatch) => {
  try {
    const res = await remove(id);
    dispatch({
      type: DELETE_CONTACTS,
      payload: { id },
    });
    return res;
  } catch (err) {
    return err;
  }
};
