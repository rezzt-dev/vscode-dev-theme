# muestra de elixir para revisar el resaltado de dark dev
defmodule DarkDev.Slot do
  @moduledoc """
  Un color de la paleta.
  """
  use GenServer
  alias DarkDev.{Ramp, Theme}
  import Enum, only: [map: 2]

  @max_steps 16
  defstruct [:name, value: 0xEEEEEE]

  @spec alpha(%__MODULE__{}, number()) :: String.t()
  def alpha(%__MODULE__{value: value}, percent) when percent >= 0 and percent <= 100 do
    "#" <> Integer.to_string(value, 16) <> " #{round(percent / 100 * 255)}"
  end

  defp helper(nil), do: :error
  defp helper(x), do: {:ok, x}

  def run(list) do
    list
    |> Enum.map(&(&1 * 2))
    |> Enum.filter(fn x -> rem(x, 2) == 0 end)
    |> case do
      [] -> :empty
      [h | _t] -> h
    end
  end
end
