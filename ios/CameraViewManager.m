//
//  CameraViewManager.m
//  AndroidModuleTest4
//
//  Created by gloovir on 02/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(CameraViewManager, RCTViewManager)
RCT_EXTERN_METHOD(changeCamera:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(record:(id)view)

@end


