export const getContacts = "SELECT * FROM contacts;";
export const getContactsById = "SELECT * FROM contacts WHERE id=$1;";

export const checkNumberExists = "SELECT s FROM contacts s WHERE s.phone=$1;";
export const checkNameExists = "SELECT s FROM contacts s WHERE s.name=$1;";
export const checkIdExists = "SELECT s FROM contacts s WHERE s.id=$1;";

export const addContact = "INSERT INTO contacts (name, email, address, image, phone, fav) VALUES ($1, $2, $3, $4, $5, $6);";
export const deleteContact = "DELETE FROM contacts WHERE id=$1";
// export const updateName = "UPDATE contacts SET name = $1 WHERE id = $2";
export const updateContact = "UPDATE contacts SET name=$1, email=$2, address=$3, image=$4, phone=$5, fav=$6 WHERE id=$7";

export const addUser = "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)";
export const deleteUser = "DELETE FROM users WHERE user_name = $1;";
export const checkEmailExists = "SELECT u FROM users u WHERE u.user_email = $1;"
export const checkUserNameExists = "SELECT u FROM users u WHERE u.user_name = $1;"
export const getUserByName = "SELECT * FROM users WHERE user_name = $1;";
export const getUsers = "select * from users";

