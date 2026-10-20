// muestra de rust para revisar el resaltado de dark dev
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
pub struct Slot<'a> {
    pub name: &'a str,
    pub value: u32,
}

impl<'a> Slot<'a> {
    pub const INK: Slot<'static> = Slot { name: "ink", value: 0xFFFFFF };

    pub fn alpha(&self, percent: f32) -> String {
        format!("#{:06X}{:02X}", self.value, (percent / 100.0 * 255.0).round() as u8)
    }
}

fn main() {
    let mut ramp: HashMap<u8, String> = HashMap::new();
    for step in [5u8, 10, 20, 40] {
        ramp.insert(step, Slot::INK.alpha(step as f32));
    }
    println!("{:?}", ramp);
}
