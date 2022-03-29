export interface ICardProps {
  data: {
    links: {
      w3: {
        title: string,
        subtitle: string,
        logo: string,
        link: string,
      },
      github: {
        title: string,
        subtitle: string,
        logo: string,
        link: string,
      },
      npm: {
        title: string,
        subtitle: string,
        logo: string,
        link: string,
      },
    },
  };
}

export interface IHeaderProps {
  data: {
    instruction: {
      packageName: string,
      version: string,
      importName: string,
      hasDefaultStyle: boolean,
    },
  };
}

export interface IDescriptionProps {
  data: {
    name: string,
    description: string,
  };
}

export type HTableContainerProps = IDescriptionProps &
  IHeaderProps &
  ICardProps;
