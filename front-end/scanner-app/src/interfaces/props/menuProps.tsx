import { LinkProps } from "react-router-dom";

export default interface HorizontalMenuProps{
    link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>
}