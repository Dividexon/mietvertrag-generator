import { useRef, useEffect, useState } from 'react';
import { MdDelete, MdCheck, MdClose, MdUpload } from 'react-icons/md';

interface Props {
  onSave: (signatureData: string, saveAsTemplate: boolean, templateName: string) => void;
  onCancel: () => void;
  initialSignature?: string;
  showSaveAsTemplate?: boolean;
}

export function SignaturePad({ onSave, onCancel, initialSignature, showSaveAsTemplate = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Style
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Load initial signature if provided
    if (initialSignature) {
      loadImageToCanvas(initialSignature);
    }
  }, [initialSignature]);

  const loadImageToCanvas = (src: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const img = new Image();
    img.onload = () => {
      // Clear canvas first
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Calculate aspect ratio to fit image
      const scale = Math.min(rect.width / img.width, rect.height / img.height) * 0.8;
      const x = (rect.width - img.width * scale) / 2;
      const y = (rect.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      setHasDrawn(true);
    };
    img.src = src;
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;

    const signatureData = canvas.toDataURL('image/png');
    onSave(signatureData, saveAsTemplate, templateName);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Bitte nur Bilddateien (PNG, JPG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      loadImageToCanvas(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="signature-pad-modal">
      <div className="signature-pad-container">
        <div className="signature-pad-header">
          <h3>Unterschrift</h3>
          <button className="signature-pad-close" onClick={onCancel}>
            <MdClose size={24} />
          </button>
        </div>
        
        <div 
          className={`signature-pad-canvas-wrapper ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <canvas
            ref={canvasRef}
            className="signature-pad-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="signature-pad-line" />
          <span className="signature-pad-hint">
            {isDragOver ? 'Bild hier ablegen' : 'Hier unterschreiben oder Bild ablegen'}
          </span>
        </div>

        {/* Save as Template */}
        {showSaveAsTemplate && (
          <div className="signature-template-section">
            <label className="signature-template-checkbox">
              <input
                type="checkbox"
                checked={saveAsTemplate}
                onChange={e => setSaveAsTemplate(e.target.checked)}
              />
              Als Vorlage speichern
            </label>
            {saveAsTemplate && (
              <input
                type="text"
                placeholder="Name der Unterschrift (z.B. Max Mustermann)"
                value={templateName}
                onChange={e => setTemplateName(e.target.value)}
                className="signature-template-input"
              />
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />

        <div className="signature-pad-actions">
          <button 
            className="signature-pad-btn upload" 
            onClick={() => fileInputRef.current?.click()}
          >
            <MdUpload size={20} />
            Bild
          </button>
          <button className="signature-pad-btn clear" onClick={clearCanvas}>
            <MdDelete size={20} />
            Löschen
          </button>
          <button 
            className="signature-pad-btn save" 
            onClick={handleSave}
            disabled={!hasDrawn}
          >
            <MdCheck size={20} />
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
