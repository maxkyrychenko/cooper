import {setUser} from "@entities/user";
import {setError} from "@shared/error";
import refresh from "../../api/refresh";
import {setIsAuth, setIsFetching} from "../slice";

const refreshThunk = () => async (dispatch: RootDispatch) => {
	dispatch(setIsFetching(true));
	try {
		const response = await refresh();

		localStorage.setItem("token", response.data.tokens.access);

		dispatch(setIsAuth(true));
		dispatch(setUser(response.data.user));

		// TODO: redirect to the login page
	} catch (e) {
		dispatch(setError());
	} finally {
		dispatch(setIsFetching(false));
	}
};

export default refreshThunk;
