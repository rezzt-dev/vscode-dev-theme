# muestra de ruby para revisar el resaltado de dark dev
require 'json'
require_relative 'palette'

module DarkDev
  MAX_STEPS = 16

  class Slot < Struct.new(:name, :value)
    include Comparable
    attr_reader :name
    @@count = 0

    def initialize(name, value = 0xEEEEEE)
      @name = name
      @value = value
      @@count += 1
    end

    # devuelve el alfa
    def alpha(percent: 50)
      raise ArgumentError, "fuera de rango" unless (0..100).cover?(percent)
      format('#%06X%02X', @value, (percent / 100.0 * 255).round)
    end

    def self.build(*names, &block)
      names.map { |n| new(n) }.each(&block)
    end
  end
end

colors = { ink: 1, on: 2 }
colors.each_pair do |key, val|
  puts "#{key} => #{val}" if val.positive? && key != :none
end
begin; Integer('x'); rescue => e; warn e.message; ensure; puts :done; end
