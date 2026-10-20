// muestra de kotlin para revisar el resaltado de dark dev
package dev.rezzt.theme

import kotlinx.coroutines.*
import java.util.Locale

const val MAX_STEPS = 16

sealed interface Ramp { fun at(index: Int): Int? }

enum class Mode { DARK, MONO }

@Serializable
data class Slot(val name: String, val value: UInt = 0xEEEEEEu) {
    /** devuelve el alfa. */
    fun alpha(percent: Double): String =
        "#%06X%02X".format(value.toInt(), (percent / 100 * 255).toInt())
}

object Registry {
    private val slots = mutableMapOf<String, Slot>()
    suspend fun load(): List<Slot> = withContext(Dispatchers.IO) {
        delay(10)
        slots.values.filter { it.name.isNotEmpty() }.sortedBy { it.name }
    }
}

fun <T : Comparable<T>> max(a: T, b: T): T = if (a > b) a else b

fun main() = runBlocking {
    val result = when (val s = Registry.load().firstOrNull()) {
        null -> "vacío"
        else -> s.alpha(50.0)
    }
    println("resultado: $result ${MAX_STEPS}")
}
