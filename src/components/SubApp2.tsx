import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import 'leaflet-hash';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { MapContainer, MapConsumer, TileLayer, ScaleControl, LayersControl, FeatureGroup } from 'react-leaflet';

import './SubApp2.css';

function BasemapLayers() {
  return (
    <div>
      <LayersControl.BaseLayer
        name='OpenStreetMap'
        checked={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={18}
          maxZoom={22}
          />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        name='地理院タイル（標準地図）'
        checked={false}
      >
        <TileLayer
          attribution="<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル（標準地図）</a>"
          url="http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
          maxNativeZoom={18}
          maxZoom={22}
          />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        name='地理院タイル（淡色地図）'
        checked={false}
      >
        <TileLayer
          attribution="<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル（淡色地図）</a>"
          url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
          maxNativeZoom={18}
          maxZoom={22}
          />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        name='地理院タイル（オルソ）'
        checked={false}
      >
        <TileLayer
          attribution="<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル（オルソ）</a>"
          url="https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg"
          maxNativeZoom={17}
          maxZoom={22}
          />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        name='地理院タイル（白地図）'
        checked={false}
      >
        <TileLayer
          attribution="<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル（白地図）</a>"
          url="https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png"
          maxNativeZoom={14}
          maxZoom={22}
          />
      </LayersControl.BaseLayer>
    </div>
  )
}

function DrawLayer() {
  return (
    <div>
      <LayersControl.Overlay name={'draw layer'}>
        <FeatureGroup>
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name={'vehicle path'}>
        <FeatureGroup></FeatureGroup>
      </LayersControl.Overlay>
    </div>
  )
}

// map container
function SubApp2MapContainer() {
  return (
    <MapContainer
      id={'map'}
      center={[35.2, 135.2]}
      zoom={13}
    >
      <ScaleControl
        position={'bottomleft'}
        imperial={false}
      />
      <LayersControl position={'topright'}>
        <BasemapLayers />
        <DrawLayer />
      </LayersControl>
      <MapConsumer>
        {(map) => {
          // ToDo: module split

          // hash  !!unstable
          // const hash = new L.hash(map);

          // latlng popup
          map.on('click', (e: any) => {
            L.popup()
              .setLatLng(e.latlng)
              .setContent(
                `
                  lat: ${e.latlng.lat.toFixed(4)} <br>
                  lng: ${e.latlng.lng.toFixed(4)}
                `
              )
              .openOn(map);
          });

          // draw-control (TMP)
          const fg_draw = L.featureGroup().addTo(map);
          const drawOptions = {
            draw: {
              polyline: false,
              polygon: false,
              circle: false,
              marker: false,
              circlemarker: false,
            },
            edit: {
              featureGroup: fg_draw,
              edit: false,
            },
          };
          const drawControl: any = new (L.Control as any).Draw(drawOptions).addTo(map);

          return null
        }}
      </MapConsumer>
    </MapContainer>
  )
}

// main
export default function SubApp2() {
  return (
    <Container className="h-100" fluid>
      <Row className="h-100">
        <Col className="col-3 h-100">
          (Input Control Area)
        </Col>
        <Col className="col-9 h-100">
          <Row className="h-100">
            <Col className="h-75">
              <SubApp2MapContainer></SubApp2MapContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
