# muestra de r para revisar el resaltado de dark dev
library(dplyr)
require(ggplot2)

MAX_STEPS <- 16L
slots <- data.frame(name = c("ink", "on"), value = c(15658734, 24), stringsAsFactors = FALSE)

#' devuelve el alfa
#' @param percent porcentaje
alpha <- function(slot, percent = 50) {
  if (is.null(slot) || percent < 0) stop("fuera de rango")
  sprintf("#%06X%02X", slot$value, round(percent / 100 * 255))
}

result <- slots %>%
  filter(value > 5) %>%
  mutate(label = paste0(name, "!")) %>%
  arrange(desc(value))

for (i in seq_len(nrow(result))) {
  cat(i, TRUE, NA, Inf, "\n")
}
