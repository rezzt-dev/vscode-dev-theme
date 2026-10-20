// muestra de tsx para revisar el resaltado de dark dev
import React, { useState, type FC } from 'react';

interface SlotProps<T extends string = 'ink'> {
  name: T;
  value?: number;
  onPick: (name: T) => void;
}

enum Mode { Dark = 'dark', Mono = 'mono' }
type Ramp = readonly [5, 10, 20];

export const Slot: FC<SlotProps> = ({ name, value = 0, onPick }) => {
  const [open, setOpen] = useState<boolean>(false);
  const label = open ? 'abierto' : `cerrado ${value}`;
  return (
    <div className="slot" data-name={name} onClick={() => onPick(name)}>
      <span style={{ color: '#eee' }}>{label}</span>
      {open && <Slot name="ink" onPick={setOpen as never} />}
    </div>
  );
};

@Injectable()
export class Service {
  constructor(private readonly http: Http) {}
  get<T>(url: string): Promise<T> { return this.http.get<T>(url) as unknown as Promise<T>; }
}

declare module 'x' { export const y: number }
namespace Theme { export const ink = 1 }
