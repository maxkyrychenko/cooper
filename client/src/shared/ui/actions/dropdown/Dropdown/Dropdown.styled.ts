import styled from "styled-components";
import {Icon} from "../../../icons";

const DropdownStyled = styled.div`
	position: relative;
`;

const ButtonStyled = styled.button`
	background: ${({theme}) => theme.colors.textPrimary.main};
	border-radius: ${({theme}) => theme.borderRadiuses.main};
	padding: ${({theme}) => theme.spacing.md} ${({theme}) => theme.spacing.lg};
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: ${({theme}) => theme.boxShadows.main};
	gap: ${({theme}) => theme.spacing.sm};
`;

const CaretIconStyled = styled(Icon)`
	flex-shrink: 0;
`;

const ListStyled = styled.ul`
	position: absolute;
	top: calc(100% + ${({theme}) => theme.spacing.xs});
	left: 0;
	width: 100%;
	border-radius: ${({theme}) => theme.borderRadiuses.main};
	box-shadow: ${({theme}) => theme.boxShadows.main};
	z-index: 999;
	overflow: hidden;
	background: ${({theme}) => theme.colors.primary.main};
	padding: ${({theme}) => theme.spacing.xs} 0;
`;

export {ButtonStyled, DropdownStyled, CaretIconStyled, ListStyled};
