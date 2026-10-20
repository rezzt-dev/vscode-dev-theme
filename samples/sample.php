<?php
// muestra de php para revisar el resaltado de dark dev
declare(strict_types=1);

namespace DarkDev\Theme;

use InvalidArgumentException;
use DarkDev\Theme\{Slot, Ramp as Steps};

interface HasAlpha { public function alpha(float $percent): string; }

/** Un color de la paleta. */
#[Attribute]
final class Color implements HasAlpha
{
    public const MAX = 16;
    private static int $count = 0;

    public function __construct(private string $name, protected readonly int $value = 0xEEEEEE) {}

    public function alpha(float $percent): string
    {
        if ($percent < 0 || $percent > 100) {
            throw new InvalidArgumentException("fuera de rango: {$percent}");
        }
        return sprintf('#%06X%02X', $this->value, (int) ($percent / 100 * 255));
    }
}

$colors = ['ink' => new Color('ink'), 'on' => new Color('on')];
foreach ($colors as $key => $color) {
    echo "$key: " . $color->alpha(50.0) . PHP_EOL;
}
$fn = fn(int $x): int => $x * 2;
