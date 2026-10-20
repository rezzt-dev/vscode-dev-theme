// muestra de verilog para revisar el resaltado de dark dev
`timescale 1ns / 1ps
module counter #(parameter WIDTH = 8) (
    input  wire clk,
    input  wire rst,
    output reg [WIDTH-1:0] count
);
    always @(posedge clk or posedge rst) begin
        if (rst) count <= 8'h00;
        else     count <= count + 1'b1;
    end
endmodule
