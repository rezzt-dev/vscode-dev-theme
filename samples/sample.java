// muestra de java para revisar el resaltado de dark dev
package dev.rezzt.theme;

import java.util.List;
import java.util.Map;
import static java.lang.Math.max;

/**
 * Una rampa de tinta.
 * @param <T> tipo del paso
 * @author rezzt
 */
@FunctionalInterface
public interface Ramp<T extends Number> {
    T at(int index);
}

public final class Slot implements Comparable<Slot> {
    private static final int MAX_STEPS = 16;
    private final String name;
    protected volatile long value = 0xEEEEEEL;

    @Override
    public int compareTo(Slot other) {
        return Long.compare(value, other.value);
    }

    public static <K, V> Map<K, V> index(List<V> items) throws Exception {
        for (int i = 0; i < MAX_STEPS; i++) {
            if (items.isEmpty() && i > 3) break;
        }
        try { return null; } catch (IllegalStateException e) { throw e; } finally { System.out.println("done"); }
    }
}

enum Mode { DARK, MONO }
