# muestra de julia para revisar el resaltado de dark dev
module DarkDev

using LinearAlgebra
import Base: show

const MAX_STEPS = 16

abstract type Mode end
struct Slot{T<:Integer}
    name::String
    value::T
end

"devuelve el alfa"
function alpha(slot::Slot, percent::Float64 = 50.0)::String
    0 <= percent <= 100 || throw(ArgumentError("fuera de rango"))
    return @sprintf("#%06X%02X", slot.value, round(Int, percent / 100 * 255))
end

square(x) = x^2
for i in 1:MAX_STEPS
    i % 2 == 0 && continue
    println("paso $i: $(square(i))")
end

end # module
