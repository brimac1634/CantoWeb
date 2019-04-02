export const parseRoutePath = (path, pathIndex) => {
	const location = path.split('/', 2)[pathIndex + 1];
	return (`/${location}`).toLowerCase()
} 