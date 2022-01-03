import { useDispatch } from "react-redux";
import { ProjectInterface } from "../../flat/HeroCarouselItem/interface";
import {changeTheme} from '../../features/theme/themeSlice';

type WrapperProps = {
  children: JSX.Element;
  projects: ProjectInterface[];
};

function Wrapper({ children, projects }: WrapperProps) {
  const dispatch = useDispatch();
  dispatch(changeTheme(projects[0]));

  return children;
}

export default Wrapper;
