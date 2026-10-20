; muestra de ensamblador x86 para revisar el resaltado de dark dev
section .data
    msg db "hola", 10, 0
    len equ $ - msg

section .text
global _start
_start:
    mov eax, 4
    mov ebx, 1
    lea ecx, [msg]
    mov edx, len
    int 0x80
    xor ebx, ebx
    mov eax, 1
    int 0x80
