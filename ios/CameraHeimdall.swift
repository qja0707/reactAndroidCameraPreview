//
//  CameraHeimdall.swift
//  AndroidModuleTest4
//
//  Created by gloovir on 02/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

import UIKit
import AVFoundation

@available(iOS 10.0, *)
class CameraHeimdall: UIView, AVCaptureFileOutputRecordingDelegate{
  func fileOutput(_ output: AVCaptureFileOutput,
                  didFinishRecordingTo outputFileURL: URL,
                  from connections: [AVCaptureConnection],
                  error: Error?) {
    // Handle output
    if error == nil {
      UISaveVideoAtPathToSavedPhotosAlbum(outputFileURL.path, nil, nil, nil)
    }
  }
  
  private let xibName = "CameraHeimdall"
  
  @IBOutlet weak var preView: UIView!
  
  
  //////////////////////
  let previewView = PreviewView()
  let captureSession = AVCaptureSession()
  let deviceDescoverySession = AVCaptureDevice.DiscoverySession.init(deviceTypes: [AVCaptureDevice.DeviceType.builtInWideAngleCamera],
                                                                     mediaType: AVMediaType.video,
                                                                     position: AVCaptureDevice.Position.unspecified)
  let deviceDescoverySession2 = AVCaptureDevice.DiscoverySession.init(deviceTypes: [AVCaptureDevice.DeviceType.builtInTelephotoCamera],
                                                                      mediaType: AVMediaType.video,
                                                                      position: AVCaptureDevice.Position.unspecified)
  let photoOutput = AVCaptureMovieFileOutput()
  var totalCamera : Array<Any> = []
  var cameraIndex = 0
  
  class PreviewView: UIView {
    override class var layerClass: AnyClass {
      return AVCaptureVideoPreviewLayer.self
    }
    
    /// Convenience wrapper to get layer as its statically known type.
    var videoPreviewLayer: AVCaptureVideoPreviewLayer {
      return layer as! AVCaptureVideoPreviewLayer
    }
  }
  
  ////////////////////////
  
  
  
  
  
  
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    self.viewInit()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
    self.viewInit()
  }
  
  private func viewInit(){
    let view = Bundle.main.loadNibNamed(xibName, owner: self, options:nil)?.first as! UIView
    view.frame = self.bounds
    self.addSubview(view)
    
    
    totalCamera = deviceDescoverySession.devices + deviceDescoverySession2.devices
    
    var count = 0
    
    for device in deviceDescoverySession.devices {
      print(count)
      print(device)
      print("############")
      count = count + 1
    }
    count = 0
    for device in deviceDescoverySession2.devices {
      print(count)
      print(device)
      print("############")
      count = count + 1
    }
    
    
    self.preView.addSubview(self.previewView)
    
    
    self.captureSession.beginConfiguration()
    //let videoDevice = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .front)
    let videoDevice = totalCamera[cameraIndex]
    
    let audioDevice = AVCaptureDevice.default(.builtInMicrophone, for: .audio, position: .unspecified)
    guard let audioDeviceInput = try? AVCaptureDeviceInput(device: audioDevice as! AVCaptureDevice),
      self.captureSession.canAddInput(audioDeviceInput)
      else {return}
    self.captureSession.addInput(audioDeviceInput)
    
    guard
      let videoDeviceInput = try? AVCaptureDeviceInput(device: videoDevice as! AVCaptureDevice),
      self.captureSession.canAddInput(videoDeviceInput)
      else { return }
    self.captureSession.addInput(videoDeviceInput)
    
    //let photoOutput = AVCapturePhotoOutput()
    
    guard captureSession.canAddOutput(photoOutput) else { return }
    captureSession.sessionPreset = .high
    captureSession.addOutput(photoOutput)
    captureSession.commitConfiguration()
    
    self.previewView.videoPreviewLayer.session = captureSession
    
    captureSession.startRunning()
    
  }
  
  @objc func changeCamera(){
    /*
    if totalCamera.count-1 <= cameraIndex {
      cameraIndex = 0
    }else{
      cameraIndex = cameraIndex + 1
    }
    */
    cameraIndex = cameraIndex + 1
    
    captureSession.beginConfiguration()
    let currentInput : AVCaptureInput
    
    if captureSession.inputs.count <= 1{
      print("no audio, It can cause bugs")
    }
    currentInput = captureSession.inputs.last!
    
    
    captureSession.removeInput(currentInput)
    
    guard
      let videoDeviceInput = try? AVCaptureDeviceInput(device: totalCamera[cameraIndex%totalCamera.count] as! AVCaptureDevice),
      self.captureSession.canAddInput(videoDeviceInput)
      else { return }
    self.captureSession.addInput(videoDeviceInput)
    captureSession.commitConfiguration()
    print("cameraIndex : ",cameraIndex)
  }
  
  override func didMoveToSuperview() {
    self.previewView.frame.size = self.preView.frame.size
  }
  
  @objc func record(){
    print("cameraIndex : ",cameraIndex)
    if photoOutput.isRecording {
      photoOutput.stopRecording()
      print("record stop")
    } else {
      let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
      let fileUrl = paths[0].appendingPathComponent("output.mov")
      try? FileManager.default.removeItem(at: fileUrl)
      photoOutput.startRecording(to: fileUrl, recordingDelegate: self as AVCaptureFileOutputRecordingDelegate)
      print("record start")
    }
  }
}
