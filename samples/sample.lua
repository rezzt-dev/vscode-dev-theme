-- muestra de lua para revisar el resaltado de dark dev
local json = require("json")
local MAX_STEPS = 16

local Slot = {}
Slot.__index = Slot

function Slot.new(name, value)
  local self = setmetatable({}, Slot)
  self.name = name
  self.value = value or 0xEEEEEE
  return self
end

--[[ devuelve el alfa ]]
function Slot:alpha(percent)
  if percent < 0 or percent > 100 then error("fuera de rango") end
  return string.format("#%06X%02X", self.value, math.floor(percent / 100 * 255))
end

for i, step in ipairs({ 5, 10, 20 }) do
  print(i, step, #"ink", nil == false)
end
while true do break end
goto done
::done::
