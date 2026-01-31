import { MdChevronRight, MdHome, MdBusiness, MdDirectionsCar } from 'react-icons/md';
import type { Mietvertrag, Vertragsart } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
}

export function Step1Vertragsart({ vertrag, updateVertrag, onNext }: Props) {
  const vertragsarten: { value: Vertragsart; label: string; icon: React.ReactNode; description: string }[] = [
    { 
      value: 'wohnraum', 
      label: 'Wohnraum', 
      icon: <MdHome size={32} />,
      description: 'Mietvertrag für Wohnungen und Häuser nach Haus & Grund Bremen'
    },
    { 
      value: 'gewerbe', 
      label: 'Gewerbe', 
      icon: <MdBusiness size={32} />,
      description: 'Mietvertrag für Büros, Läden und Gewerberäume'
    },
    { 
      value: 'garage', 
      label: 'Garage / Stellplatz', 
      icon: <MdDirectionsCar size={32} />,
      description: 'Separater Mietvertrag für Garagen und PKW-Stellplätze'
    },
  ];

  const handleSelect = (art: Vertragsart) => {
    updateVertrag('vertragsart', art);
  };

  const canContinue = vertrag.vertragsart !== '';

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Welche Art von Mietvertrag möchten Sie erstellen?</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {vertragsarten.map((art) => (
              <button
                key={art.value}
                onClick={() => handleSelect(art.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '24px',
                  background: vertrag.vertragsart === art.value ? 'var(--accent-pastel)' : 'var(--bg-input)',
                  border: `2px solid ${vertrag.vertragsart === art.value ? 'var(--accent)' : 'var(--border-color)'}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: vertrag.vertragsart === art.value ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: vertrag.vertragsart === art.value ? 'white' : 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {art.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 600, 
                    marginBottom: '4px',
                    color: 'var(--text-primary)',
                  }}>
                    {art.label}
                  </h3>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}>
                    {art.description}
                  </p>
                </div>
                {vertrag.vertragsart === art.value && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}>
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {vertrag.vertragsart === 'gewerbe' && (
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              background: 'var(--warning)', 
              borderRadius: '12px',
              color: 'white',
            }}>
              <strong>⚠️ Hinweis:</strong> Der Gewerbemietvertrag befindet sich noch in Entwicklung.
            </div>
          )}
          
          {vertrag.vertragsart === 'garage' && (
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              background: 'var(--warning)', 
              borderRadius: '12px',
              color: 'white',
            }}>
              <strong>⚠️ Hinweis:</strong> Der Garagenmietvertrag befindet sich noch in Entwicklung.
            </div>
          )}
        </div>
      </div>

      <div className="nav-buttons">
        <button 
          className="btn btn-primary btn-next" 
          onClick={onNext}
          disabled={!canContinue}
        >
          Weiter zu Vermieter
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
