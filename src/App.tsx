import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import { ShinyComponent, ShinyComponents, Data } from './Types';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NugetList from './Components/NugetList';
import MauiProgram from './Components/MauiProgram';
import AndroidManifest from './Components/AndroidManifest';
import AppleInfoPlist from './Components/AppleInfoPlist';
import AppleEntitlements from './Components/AppleEntitlements';
import AppleAppDelegate from './Components/AppleAppDelegate';
import { Col, Container, Row } from 'react-bootstrap';

const App = () => {
  const { usesPush } = Data;
  const [components, setComponents] = useState<ShinyComponent[]>([]);

  const handleChange = (e: ShinyComponent) => {
    if (isSelected(e)) {
      setComponents(arr => arr.filter(c => c.id !== e.id));
    }
    else {
      setComponents(arr => [...arr, e!]);
    }
  };

  const isSelected = (shiny: ShinyComponent): boolean => components.find(c => c.id === shiny.id) !== undefined;

  return (
    <div className="App">
      <header className="App-header">
        <img width={50} src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Shiny.NET Boilerplate Generator</h1>
      </header>
      <div>
        <Container className="ComponentContainer">
        {ShinyComponents.map((item, index) => (
          <Row key={index}>
            <Col>{item.description}</Col>
            <Col><input id={item.id} type="checkbox" checked={isSelected(item)} onClick={() => handleChange(item)} /></Col>
          </Row>
        ))}
        </Container>
        <Tabs
          defaultActiveKey="nugets"
          className="mb-3"      
        >
          <Tab eventKey="nugets" title="NuGets">
            <NugetList components={components}/>
          </Tab>        
          <Tab eventKey="maui" title="MauiProgram.cs">
            <MauiProgram components={components} />
          </Tab>
          <Tab eventKey="androidmanifest" title="Android Manifest">
            <AndroidManifest components={components} />
          </Tab>        
          <Tab eventKey="infoplist" title="Apple Info.plist">
            <AppleInfoPlist components={components} />
          </Tab>
          {usesPush(components) && 
            <Tab eventKey="entitlements" title="Apple Entitlements.plist">
              <AppleEntitlements />
            </Tab>
          }
          {usesPush(components) && 
            <Tab eventKey="appdelegate" title="Apple Application Delegate">
              <AppleAppDelegate />
            </Tab>
          }
        </Tabs>
      </div>
    </div>
  );
};

export default App;