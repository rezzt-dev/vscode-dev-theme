// muestra de zig para revisar el resaltado de dark dev
const std = @import("std");

const max_steps: usize = 16;

const Mode = enum { dark, mono };

const Slot = struct {
    name: []const u8,
    value: u32 = 0xEEEEEE,

    pub fn alpha(self: Slot, percent: f32) u8 {
        return @intFromFloat(percent / 100.0 * 255.0 + @as(f32, @floatFromInt(self.value & 0)));
    }
};

fn Ramp(comptime T: type) type {
    return struct { items: []T };
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const slot = Slot{ .name = "ink" };
    for (0..max_steps) |i| {
        if (i % 2 == 0) continue;
        std.debug.print("{s}: {d}\n", .{ slot.name, i });
    }
    const x: ?u8 = null;
    _ = x orelse return error.Missing;
}
