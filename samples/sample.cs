// muestra de c# para revisar el resaltado de dark dev
using System;
using System.Collections.Generic;
using System.Linq;

namespace DarkDev.Themes;

public enum Mode { Dark, Mono }

public interface IRamp<out T> { T At(int index); }

[Serializable]
public sealed record Slot(string Name, uint Value);

public class Ramp : IRamp<int>
{
    private readonly List<int> _steps = new() { 5, 10, 20 };
    public const int Max = 16;
    public string Title { get; init; } = "ramp";

    /// <summary>devuelve el paso en la posición indicada.</summary>
    public int At(int index)
    {
        if (index < 0 || index >= _steps.Count) throw new ArgumentOutOfRangeException(nameof(index));
        return _steps[index];
    }

    public async Task<int> SumAsync()
    {
        var total = 0;
        foreach (var step in _steps.Where(s => s > 5)) total += step;
        await Task.Delay(10);
        return total is > 0 ? total : default;
    }

    public override string ToString() => $"{Title}: {string.Join(", ", _steps)}";
}
