// muestra de scala para revisar el resaltado de dark dev
package dev.rezzt.theme

import scala.collection.mutable
import scala.concurrent.{Future, ExecutionContext}

sealed trait Mode
case object Dark extends Mode
case object Mono extends Mode

/** Un color de la paleta. */
final case class Slot(name: String, value: Int = 0xEEEEEE) {
  def alpha(percent: Double): String = f"#$value%06X ${(percent / 100 * 255).toInt}%02X"
}

object Registry {
  private val slots = mutable.Map.empty[String, Slot]
  implicit val ec: ExecutionContext = ExecutionContext.global

  def load[T <: Slot](n: Int): Future[List[T]] = Future {
    val xs = for (i <- 1 to n if i % 2 == 0) yield i
    xs.map(_ * 2).toList.asInstanceOf[List[T]]
  }

  def describe(m: Mode): String = m match {
    case Dark => "oscuro"
    case _    => "mono"
  }
}
