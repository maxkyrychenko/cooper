import {NextFunction, Response} from "express";
import {ValidationChain, validationResult} from "express-validator";
import {CustomRequest} from "../../types";
import {ErrorThrower} from "../error";

const validationMiddleware =
	(validationRules: ValidationChain[]) =>
	async (req: CustomRequest, res: Response, next: NextFunction) => {
		try {
			for (let i = 0; i < validationRules.length; i += 1) {
				const validationRule = validationRules[i];
				// eslint-disable-next-line no-await-in-loop
				const result = await validationRule.run(req);
				if (!result.isEmpty()) {
					break;
				}
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				ErrorThrower.throwValidation(errors.array());
			}

			next();
		} catch (e) {
			next(e);
		}
	};

export default validationMiddleware;
