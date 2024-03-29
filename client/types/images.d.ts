declare module "*.png";
declare module "*.woff2";
declare module "*.svg" {
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const content: string;

	export {ReactComponent};
	export default content;
}
