// muestra de groovy para revisar el resaltado de dark dev
package dev.rezzt.theme

import groovy.transform.CompileStatic

@CompileStatic
class Slot {
    String name
    int value = 0xEEEEEE
    static final int MAX = 16

    String alpha(double percent) {
        assert percent >= 0 && percent <= 100
        return String.format('#%06X', value) + "${(int) (percent / 100 * 255)}"
    }
}

def slots = [new Slot(name: 'ink'), new Slot(name: 'on')]
slots.each { s -> println "${s.name}: ${s.alpha(50)}" }
