#!/usr/bin/perl
# muestra de perl para revisar el resaltado de dark dev
use strict;
use warnings;
use constant MAX_STEPS => 16;

my %slots = (ink => 0xEEEEEE, on => 24);
my @names = sort keys %slots;
our $VERSION = '1.0';

sub alpha {
    my ($slot, $percent) = @_;
    die "fuera de rango" unless $percent >= 0 && $percent <= 100;
    return sprintf("#%06X%02X", $slots{$slot}, int($percent / 100 * 255));
}

foreach my $name (@names) {
    if ($name =~ /^i(nk)$/i) { print "$name: ", alpha($name, 50), "\n"; }
}
my $ref = \@names;
print scalar(@{$ref}), "\n";
