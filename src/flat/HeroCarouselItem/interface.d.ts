export interface HeroCarouselItemProps{
    isPrimary?: boolean;
    project: Project;
}

export interface ProjectInterface{
    name: string;
    images: string[];
    description: string;
    primaryColor: string;
    secondaryColor: string;
    darkMode: boolean;
    height: number;
    width: number;
}
