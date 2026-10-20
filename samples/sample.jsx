// muestra de jsx para revisar el resaltado de dark dev
import { useState } from 'react';

export default function Slot({ name, value = 0, onPick }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="slot" data-name={name} onClick={() => onPick?.(name)}>
      <h2 style={{ color: '#eee' }}>{open ? `abierto ${value}` : 'cerrado'}</h2>
      {[5, 10, 20].map((step) => <Step key={step} value={step} />)}
      <>{open && <button type="button" disabled>cerrar</button>}</>
    </section>
  );
}
