import styled, {css} from "styled-components";

interface PageProps {
	isFullscreen?: boolean;
}

const Page = styled.div<PageProps>`
	${({isFullscreen}) =>
		isFullscreen
			? css`
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 100vh;
			  `
			: css`
					padding: 28px 0;
			  `}
`;

export default Page;
