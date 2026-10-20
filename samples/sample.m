// muestra de objective-c para revisar el resaltado de dark dev
#import <Foundation/Foundation.h>

@interface Slot : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) NSUInteger value;
- (NSString *)alphaForPercent:(double)percent;
@end

@implementation Slot
- (NSString *)alphaForPercent:(double)percent {
    if (percent < 0 || percent > 100) { return nil; }
    return [NSString stringWithFormat:@"#%06lX", (unsigned long)self.value];
}
@end
