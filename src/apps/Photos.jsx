import { useState } from 'react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

const PHOTOS = [
  { name: 'Bloom', place: 'Desktop wallpaper', art: 'radial-gradient(circle at 45% 45%, #bfe9ff 0%, #4f7dff 30%, #1a1f5c 72%)' },
  { name: 'Dusk', place: 'Skyline study', art: 'linear-gradient(205deg, #ffb27a 0%, #c05a8c 42%, #2b1740 100%)' },
  { name: 'Meadow', place: 'Nature', art: 'linear-gradient(160deg, #b7f0c8 0%, #2f8f6a 46%, #0b2b26 100%)' },
  { name: 'Graphite', place: 'Minimal', art: 'linear-gradient(180deg, #4c525c 0%, #1c1f24 70%)' },
  { name: 'Lagoon', place: 'Travel', art: 'radial-gradient(circle at 70% 20%, #9ff5ff 0%, #1f9bb5 38%, #082c3d 80%)' },
  { name: 'Ember', place: 'Abstract', art: 'radial-gradient(circle at 30% 70%, #ffd27a 0%, #f2643c 40%, #2b0d0d 85%)' },
  { name: 'Orchid', place: 'Abstract', art: 'radial-gradient(circle at 60% 40%, #ffc8f2 0%, #b060e0 40%, #241035 82%)' },
  { name: 'Cobalt', place: 'Wallpaper', art: 'linear-gradient(140deg, #6fa8ff 0%, #2148b8 45%, #050d2b 100%)' },
];

export default function Photos() {
  const [active, setActive] = useState(null);

  if (active) {
    return (
      <div className="photo-viewer">
        <div className="photo-stage">
          <div className="photo-art" style={{ background: active.art }} />
        </div>
        <div className="photo-viewer-bar">
          <button type="button" className="icon-btn" onClick={() => setActive(null)} aria-label="Back to gallery">
            <ArrowLeft size={16} />
          </button>
          <div>
            <b>{active.name}.png</b>
            <small> · {active.place}</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="photos">
      <div className="photos-head">
        <ImageIcon size={16} aria-hidden="true" />
        <b>Collection</b>
        <span className="photos-count">{PHOTOS.length} items</span>
      </div>
      <div className="photos-grid">
        {PHOTOS.map((photo) => (
          <button key={photo.name} type="button" className="photo-card" onClick={() => setActive(photo)} aria-label={`Open ${photo.name}`}>
            <span className="photo-art" style={{ background: photo.art }} aria-hidden="true" />
            <span>{photo.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
