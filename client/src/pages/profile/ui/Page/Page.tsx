import {selectProfile, selectProfileIsFetching} from "@entities/profile";
import {ProjectCard, ProjectList, selectProjects} from "@entities/project";
import {AddToFavoritesButton} from "@features/user/addToFavorites";
import {ScreenWidths} from "@shared/constants";
import {useWindowSize} from "@shared/lib";
import {useTypedDispatch, useTypedSelector} from "@shared/model";
import {
	Avatar,
	Icon,
	Loader,
	StatisticsItem,
	Typography,
	Widget
} from "@shared/ui";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import initializePage from "../../model/initializePage";
import {
	GridContainerStyled,
	InfoStyled,
	LocationStyled,
	StatisticsListStyled
} from "./Page.styled";

const Page = () => {
	const {username} = useParams();
	const dispatch = useTypedDispatch();
	const {width} = useWindowSize();

	// Selectors
	const isFetching = useTypedSelector(selectProfileIsFetching);
	const profile = useTypedSelector(selectProfile);
	const projects = useTypedSelector(selectProjects);

	useEffect(() => {
		if (username != null) {
			dispatch(initializePage(username));
		}
	}, [dispatch, username]);

	if (isFetching) {
		return <Loader />;
	}

	if (profile === null) {
		// todo: improve logic
		return <div>Something went wrong</div>;
	}

	return (
		<GridContainerStyled>
			<Avatar
				width={width <= ScreenWidths.Tablet ? "150px" : "200px"}
				height={width <= ScreenWidths.Tablet ? "150px" : "200px"}
				imagePath={profile.avatar}
			/>
			<InfoStyled>
				<Typography variant="h3" mb="sm">
					{profile.username}
				</Typography>
				<LocationStyled>
					<Icon name="location" />
					<Typography>{profile.location || "Unknown location."}</Typography>
				</LocationStyled>
				<Typography>
					{profile.description || "Description is empty."}
				</Typography>
			</InfoStyled>
			<StatisticsListStyled>
				{/* todo: replace hard-coded value */}
				<StatisticsItem title="projects" value="50" />
			</StatisticsListStyled>
			<Widget>
				<ProjectList>
					{projects.map(project => (
						<ProjectCard
							key={project.id}
							project={project}
							actionsSlot={<AddToFavoritesButton projectId={project.id} />}
						/>
					))}
				</ProjectList>
			</Widget>
		</GridContainerStyled>
	);
};

export default Page;