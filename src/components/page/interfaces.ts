export interface IPageProps {
  children: any;
  title: string;
  button?: {
    handleClick: (any?: any) => void;
    title: string;
  };
}
