import React from "react";

export default function requireAuth(Component) {
	class AuthenticatedComponent extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				isLoggedIn: false,
			};
		}
		componentDidMount() {
			this.checkAuth();
		}

		checkAuth() {
			const user = JSON.parse(localStorage.getItem("user_data"));
			if (!user) {
				return this.props.history.push('/login');
			} 
		}

		render() {
			return <Component {...this.props} />;
		}
	}
	return AuthenticatedComponent;
}
