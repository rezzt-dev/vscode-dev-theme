// muestra de f# para revisar el resaltado de dark dev
module DarkDev.Theme

open System

type Mode = Dark | Mono

type Slot = { Name: string; Value: int }

let alpha (slot: Slot) (percent: float) : string =
    if percent < 0.0 || percent > 100.0 then failwith "fuera de rango"
    sprintf "#%06X %d" slot.Value (int (percent / 100.0 * 255.0))

let slots =
    [ { Name = "ink"; Value = 0xEEEEEE } ]
    |> List.map (fun s -> alpha s 50.0)
    |> List.filter (fun s -> s.Length > 0)

match slots with
| [] -> printfn "vacío"
| x :: _ -> printfn $"primero: {x}"
