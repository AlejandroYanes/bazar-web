import { SVGProps } from 'react';

type Props = Partial<SVGProps<SVGSVGElement>> & { icon: any };

const IconoirIcon = ({ icon, ...rest }: Props) => {
  const Component: any = icon;
  return <Component {...rest} />
};

export default IconoirIcon;
