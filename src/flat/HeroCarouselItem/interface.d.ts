export interface HeroCarouselItemProps{
    isPrimary?: boolean;
    project: Project;
}

export interface ProjectInterface {
  name: string;
  images?: string[];
  frontImage: ProjectFrontImageInterface;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
  type: string;
  tags: string[];
  links: ProjectLinkInterface[];
  showcase: ProjectShowcase[];
  height: number;
  width: number;
}

export interface ProjectFrontImageInterface{
  src: string;
  width: number;
  height: number;
}

export interface ProjectLinkInterface{
    title: string;
    href: string;
}

export interface ProjectShowcase {
  src: string;
  description: string;
}
