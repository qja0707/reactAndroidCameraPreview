//
//  GetData.m
//  AndroidModuleTest4
//
//  Created by gloovir on 11/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(GetData, NSObject)
RCT_EXTERN_METHOD(getIsRecording:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getFilePath:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getCameraFacing:(RCTResponseSenderBlock)callback)
@end
