# muestra de nim para revisar el resaltado de dark dev
import std/[strutils, tables]

const MaxSteps = 16

type
  Mode = enum dark, mono
  Slot = object
    name: string
    value: int

proc alpha(slot: Slot, percent: float): string =
  if percent < 0 or percent > 100:
    raise newException(ValueError, "fuera de rango")
  result = "#" & toHex(slot.value) & $int(percent / 100 * 255)

var slots = {"ink": 0xEEEEEE}.toTable
for key, val in slots.pairs:
  echo key, ": ", val
