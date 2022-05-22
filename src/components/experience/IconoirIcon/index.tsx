import { SVGProps } from 'react';

type Props = Partial<SVGProps<SVGSVGElement>> & { icon: any };

const IconoirIcon = ({ icon, width = 32, height = 32, ...rest }: Props) => {
  const Component: any = icon;
  return <Component width={width} height={height} {...rest} />
};

export default IconoirIcon;
