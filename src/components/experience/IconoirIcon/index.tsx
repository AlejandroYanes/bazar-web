const IconoirIcon = ({ icon, ...rest }: Partial<SVGSVGElement> & { icon: any }) => {
  const Component: any = icon;
  return <Component {...rest} />
};

export default IconoirIcon;
