//
//  CameraViewManager.swift
//  AndroidModuleTest4
//
//  Created by gloovir on 02/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@available(iOS 10.0, *)
@objc(CameraViewManager)
class CameraViewManager: RCTViewManager{
  let cameraHeimdall = CameraHeimdall()
  override func view() -> UIView! {   
    return cameraHeimdall
    //return CameraHeimdall()
  }
  
  @objc
  func changeCamera(_ node:NSNumber){
    self.cameraHeimdall.changeCamera()
  }
  
  @objc
  func record(_ node:NSNumber, orientation: NSString){
    cameraHeimdall.record(orientation: orientation)
    
  }
}
