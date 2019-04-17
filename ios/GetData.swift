//
//  GetData.swift
//  AndroidModuleTest4
//
//  Created by gloovir on 10/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@available(iOS 10.0, *)
@objc(GetData)
class GetData: NSObject {

  @objc func getIsRecording(_ callback: RCTResponseSenderBlock) {   
    callback([NSNull() ,CameraHeimdall.getIsRecording()])
  }
  
  @objc func getFilePath(_ callback: RCTResponseSenderBlock) {
    
    callback([NSNull() ,CameraHeimdall.getFileUrl()])
  }
  @objc func getCameraFacing(_ callback: RCTResponseSenderBlock) {
    
    callback([NSNull() ,CameraHeimdall.getCameraFacing()])
  }
}
