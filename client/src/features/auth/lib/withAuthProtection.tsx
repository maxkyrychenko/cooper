import {RouteNames} from "@shared/constants";
import {useTypedSelector} from "@shared/model";
import {FC} from "react";
import {Navigate} from "react-router-dom";
import {selectIsAuth} from "../model/selectors";

const withAuthProtection = (Component: FC) => () => {
	const isAuth = useTypedSelector(selectIsAuth);

	if (!isAuth) {
		return <Navigate to={RouteNames.Signup} replace />;
	}

	return <Component />;
};

export default withAuthProtection;
