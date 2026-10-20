"""muestra de python para revisar el resaltado de dark dev."""
from dataclasses import dataclass, field
from typing import Iterable

INK_STEPS = (5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90)


@dataclass(frozen=True)
class Slot:
    name: str
    value: str = "#000000"
    tags: list[str] = field(default_factory=list)

    def alpha(self, percent: int) -> str:
        """devuelve el color con opacidad."""
        return f"{self.value}{round(percent / 100 * 255):02X}"


def ramp(slot: Slot, steps: Iterable[int] = INK_STEPS) -> dict[int, str]:
    # la rampa de tinta: el verdadero sistema de color
    return {step: slot.alpha(step) for step in steps if 0 < step < 100}


if __name__ == "__main__":
    ink = Slot("ink", "#FFFFFF", tags=["base"])
    for step, color in ramp(ink).items():
        print(f"Ink{step:02d}\t{color}\n", end="")
    assert len(ramp(ink)) == 11, None
