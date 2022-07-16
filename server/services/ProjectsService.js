const Project = require("../models/Project");
const ApiError = require("../exceptions/ApiError");

class ProjectsService {
	static async create(project) {
		const createdProject = await Project.create(project);

		return createdProject;
	}

	static async updateOne(id, project) {
		const updatedProject = await Project.updateOne({_id: id}, project, {
			new: true
		});

		return updatedProject;
	}

	static async deleteOne(projectId, userId) {
		const userProjects = await Project.find({user: userId});
		const isProject = userProjects.some(project => project.id === projectId);

		if (!isProject) {
			throw ApiError.badRequest("You can only delete your own themes!");
		}

		const project = await Project.deleteOne({_id: projectId});
		return project;
	}

	static async getAll({sort, limit, offset, search}) {
		const projects = await Project.aggregate([
			{
				$match: {
					visibility: "public",
					$or: [{title: {$regex: search}}, {description: {$regex: search}}]
				}
			},
			{$sort: {[sort]: -1}},
			{
				$lookup: {
					from: "users",
					localField: "creator",
					foreignField: "_id",
					pipeline: [{$project: {_id: 0, avatar: 1, username: 1}}],
					as: "creator"
				}
			},
			{$unwind: "$creator"},
			{
				$facet: {
					projects: [{$skip: offset}, {$limit: limit}],
					totalCount: [
						{
							$count: "totalCount"
						}
					]
				}
			},
			{
				$addFields: {
					totalCount: {
						$ifNull: [{$arrayElemAt: ["$totalCount.totalCount", 0]}, 0]
					}
				}
			}
		]);

		return projects[0];
	}

	static async getOneById(id) {
		const project = await Project.findById(id).populate("creator", [
			"createdDate",
			"projectsCount"
		]);

		return project;
	}

	static async getByUserId(id) {
		const projects = Project.find({creator: id});

		return projects;
	}
}

module.exports = ProjectsService;
