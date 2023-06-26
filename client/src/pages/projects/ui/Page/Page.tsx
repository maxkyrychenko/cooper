import {
	clearProjectsState,
	fetchMoreProjectsThunk,
	fetchProjectsThunk,
	ProjectCard,
	ProjectCardUser,
	ProjectList,
	ProjectListPanel,
	selectProjects,
	selectProjectsIsFetching,
	selectProjectsLimit,
	selectProjectsPage,
	selectProjectsSearch,
	selectProjectsSort,
	selectProjectsTotalCount
} from "@entities/project";
import {InfiniteScrollList} from "@features/infiniteScroll";
import {ProjectsSearchBar} from "@features/project/searchProjects";
import {ProjectsSortDropdown} from "@features/project/sortProjects";
import {AddToFavoritesButton} from "@features/user/addToFavorites";
import {hasMoreEntities} from "@shared/lib";
import {useTypedDispatch, useTypedSelector} from "@shared/model";
import {Widget} from "@shared/ui";
import {useCallback, useEffect, useMemo} from "react";
import {WidgetStyled} from "./Page.styled";

const Page = () => {
	const dispatch = useTypedDispatch();

	const projects = useTypedSelector(selectProjects);
	const isFetching = useTypedSelector(selectProjectsIsFetching);
	const search = useTypedSelector(selectProjectsSearch);
	const limit = useTypedSelector(selectProjectsLimit);
	const sort = useTypedSelector(selectProjectsSort);
	const page = useTypedSelector(selectProjectsPage);
	const totalCount = useTypedSelector(selectProjectsTotalCount);

	const hasMore = hasMoreEntities({totalCount, limit, page});

	const params = useMemo(
		() => ({page: 1, limit, search, sort: sort.value}),
		[limit, search, sort.value]
	);

	useEffect(
		() => () => {
			dispatch(clearProjectsState());
		},
		[dispatch]
	);

	useEffect(() => {
		dispatch(fetchProjectsThunk(params));
	}, [dispatch, params]);

	const handleFetchMore = useCallback(() => {
		dispatch(fetchMoreProjectsThunk({...params, page: page + 1}));
	}, [dispatch, page, params]);

	return (
		<>
			<WidgetStyled>
				<ProjectListPanel
					leftContentSlot={<ProjectsSearchBar />}
					rightContentSlot={<ProjectsSortDropdown />}
				/>
			</WidgetStyled>
			<Widget>
				<InfiniteScrollList
					onFetchMore={handleFetchMore}
					isFetching={isFetching}
					hasMore={hasMore}
				>
					<ProjectList>
						{projects.map(project => (
							<ProjectCard
								key={project.id}
								project={project}
								actionsSlot={<AddToFavoritesButton projectId={project.id} />}
								headerEndSlot={
									<ProjectCardUser
										avatar={project.creator.avatar}
										username={project.creator.username}
									/>
								}
							/>
						))}
					</ProjectList>
				</InfiniteScrollList>
			</Widget>
		</>
	);
};

export default Page;