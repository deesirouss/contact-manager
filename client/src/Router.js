import { Route, Switch } from "react-router-dom";
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
import { ContactListNew } from "./components/contacts/ContactList";
import { AddContact } from "./components/contacts/ContactAdd";
import { UpdateContact } from "./components/contacts/ContactUpdate";
import { Error } from "./Error";
import requireAuth from "./RequireAuth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={["/"]} component={requireAuth(ContactListNew)} />
      <Route exact path={["/login"]} component={Login} />
      <Route exact path={["/register"]} component={Register} />
      <Route
        exact
        path={["/add-contact"]}
        component={requireAuth(AddContact)}
      />
      <Route
        exact
        path={["/update-contact/:id"]}
        component={requireAuth(UpdateContact)}
      />
      <Route exact path={["*"]} component={Error} />
    </Switch>
  );
};
export default Router;
