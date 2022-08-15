import * as THREE from 'three';

export const generateBoxEdges = (options) => {
	const boxGeometry = new THREE.BoxGeometry(...options.dimensions);
	const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
	const material = new THREE.LineBasicMaterial({
		color: new THREE.Color(options.color ?? 'black'),
		transparent: true,
		opacity: options.opacity
	});
	const edges = new THREE.LineSegments(edgesGeometry, material);
	return edges;
};

export const generateBoxPoints = (options) => {
	const boxGeometry = new THREE.BoxGeometry(...options.dimensions);
	const material = new THREE.PointsMaterial({
		color: options.color ?? 'black',
		size: options.size,
		transparent: true,
		opacity: options.opacity
	});
	const points = new THREE.Points(boxGeometry, material);
	return points;
};

export const generateSphereEdges = (options) =>
	new THREE.LineSegments(
		new THREE.SphereGeometry(options.radius, options.segments.w, options.segments.h),
		new THREE.PointsMaterial({
			color: options.color ?? 'black',
			transparent: true,
			opacity: options.opacity
		})
	);

export const generateSpherePoints = (options) =>
	new THREE.Points(
		new THREE.SphereGeometry(options.radius, options.segments.w, options.segments.h),
		new THREE.PointsMaterial({
			color: options.color ?? 'black',
			size: options.size,
			transparent: true,
			opacity: options.opacity
		})
	);
