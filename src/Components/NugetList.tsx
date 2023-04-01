import { Col, Container, Row } from 'react-bootstrap';
import type { ShinyComponent } from '../Types';
import NugetBadge from './NugetBadge';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboardButton from './CopyToClipboardButton';

export interface Props {
  components: ShinyComponent[]
}

const NugetList = (props: Props) => {
  if (props.components.length === 0) 
    return (<div>No components</div>);

  const nugets = props.components
    .filter(
      (thing, i, arr) => arr.findIndex(t => t.nuget === thing.nuget) === i
    )
    .sort((a, b) => (
      (a.nuget > b.nuget) ? 1 : ((b.nuget > a.nuget) ? -1 : 0))
    );

  let pr = "<ItemGroup>\r\n";
  nugets.map(c => {
    pr += `\t<PackageReference Include="${c.nuget}" version="${c.version}" />\r\n`;
  });
  pr += "</ItemGroup>";

  return (
    <div>
      <Container>
        {nugets.map(c => (
          <Row key={c.id}>
            <Col>{c.nuget}</Col>
            <Col><NugetBadge name={c.nuget} /></Col>
            <Col><NugetBadge name={c.nuget} showDownloads={true} /></Col>
          </Row>
        ))}
      </Container>
      <hr />
      <h3>Copy & Paste this into your csproj</h3>
      <SyntaxHighlighter language="xml" style={docco}>
        {pr}
      </SyntaxHighlighter>
      <CopyToClipboardButton text={pr} />
    </div>
  );
};
export default NugetList;