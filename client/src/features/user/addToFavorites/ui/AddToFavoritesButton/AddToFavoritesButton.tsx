import {
	selectIsAddingToFavorites,
	selectUserFavoriteProjects
} from "@entities/user";
import {selectIsAuth} from "@features/auth";
import {RouteNames} from "@shared/constants";
import {useTypedDispatch, useTypedSelector} from "@shared/model";
import {useToastContext} from "@shared/toast";
import {ToastContextValue} from "@shared/toast/lib/types";
import {FC} from "react";
import {useNavigate} from "react-router-dom";
import addFavoriteProjectThunk from "../../model/thunks/addFavoriteProjectThunk";
import removeFavoriteProjectThunk from "../../model/thunks/removeFavoriteProjectThunk";
import {
	HeartIcon,
	StyledAddToFavoritesButton
} from "./AddToFavoritesButton.styled";

interface Props {
	projectId: string;
}

const AddToFavoritesButton: FC<Props> = ({projectId}) => {
	const dispatch = useTypedDispatch();
	const navigate = useNavigate();
	const {openToast} = useToastContext() as ToastContextValue;

	// Selectors
	const favorites = useTypedSelector(selectUserFavoriteProjects);
	const isAddingToFavorites = useTypedSelector(selectIsAddingToFavorites);
	const isAuth = useTypedSelector(selectIsAuth);

	const inFavorites =
		favorites != null ? favorites.some(id => id === projectId) : false;

	const handleClick = () => {
		if (!isAuth) {
			navigate(RouteNames.Login);
			return;
		}

		if (inFavorites) {
			dispatch(removeFavoriteProjectThunk(projectId));
			openToast("success", "Successfully removed from favorites.");
		} else {
			dispatch(addFavoriteProjectThunk(projectId));
			openToast("success", "Successfully added to favorites.");
		}
	};

	return (
		<StyledAddToFavoritesButton
			onClick={handleClick}
			aria-label="Save button"
			type="button"
			disabled={isAddingToFavorites}
		>
			<HeartIcon
				color="secondary"
				name="heart"
				variant={inFavorites ? "solid" : "outline"}
				size={24}
			/>
		</StyledAddToFavoritesButton>
	);
};

export default AddToFavoritesButton;