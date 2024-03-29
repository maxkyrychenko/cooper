// Single project selectors
const selectProject = (state: RootState) => state.projectState.single.data;

const selectProjectIsFetching = (state: RootState) =>
	state.projectState.single.isFetching;

// Multiple project selectors
const selectProjects = (state: RootState) => state.projectState.multiple.data;

const selectProjectsIsFetching = (state: RootState) =>
	state.projectState.multiple.isFetching;

const selectProjectsShouldRefetch = (state: RootState) =>
	state.projectState.multiple.shouldRefetch;

const selectProjectsSearch = (state: RootState) =>
	state.projectState.multiple.search;

const selectProjectsLimit = (state: RootState) =>
	state.projectState.multiple.limit;

const selectProjectsSort = (state: RootState) =>
	state.projectState.multiple.sort;

const selectProjectsPage = (state: RootState) =>
	state.projectState.multiple.page;

const selectProjectsTotalCount = (state: RootState) =>
	state.projectState.multiple.totalCount;

const selectProjectsTotalPages = (state: RootState) =>
	state.projectState.multiple.totalPages;

const selectProjectsError = (state: RootState) =>
	state.projectState.multiple.error;

export {
	selectProject,
	selectProjectIsFetching,
	selectProjects,
	selectProjectsError,
	selectProjectsIsFetching,
	selectProjectsLimit,
	selectProjectsPage,
	selectProjectsSearch,
	selectProjectsShouldRefetch,
	selectProjectsSort,
	selectProjectsTotalCount,
	selectProjectsTotalPages
};
