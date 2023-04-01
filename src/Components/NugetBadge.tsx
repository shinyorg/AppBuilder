export interface Props {
  name: string;
  label?: string;
  showDownloads?: boolean;
}
  
const NugetBadge = (props: Props) => {
  const type = props.showDownloads === true ? "dt" : "v";
  let imgUrl: string = `https://img.shields.io/nuget/${type}/${props.name}?style=for-the-badge`;
  if (props.label !== undefined)
    imgUrl += `&label=${props.label}`;
  const nugetUrl: string = `https://www.nuget.org/packages/${props.name}`;
  return (<a href={nugetUrl} target="_NEWWINDOW"><img src={imgUrl} /></a>);
};
export default NugetBadge;