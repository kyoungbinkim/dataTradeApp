//
//  libsnark_wrapper.swift
//  azerothFront
//
//  Created by Jaekyoung Choi on 2022/06/09.
//

import Foundation
import CSnark

@objc(LibsnarkModule)
class LibsnarkModule: NSObject {
  
  static let serializeFormatDefault : Int32 = 1
  static let serializeFormatCRV : Int32 = 2
  static let serializeFormatZKlay : Int32 = 3
  
  let R1CS_GG : Int32     = 1
  let R1CS_ROM_SE : Int32 = 2
  
  public static let EC_ALT_BN128 : Int32 = 1
  public static let EC_BLS12_381 : Int32 = 2
  
  private var context_id : Int32 = 0
  private var context_id_map: [String: Int32] = ["ZKlay": 0, "ZKlay_nft": 0, "GenTrade":0];
  var contextID : Int { get { return Int(context_id) } }
  
  @objc(getContextId:resolver:rejecter:)
  func getContextId(_ circuitName: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let resolveData: [String: String] = ["contextId": "\(context_id_map[circuitName] ?? 0)"];
    resolve(resolveData)
  }
  
  @objc(setContextId:resolver:rejecter:)
  func setContextId(_ circuitName: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    context_id = context_id_map[circuitName] ?? 0;
    
    let resolveData: [String: String] = ["contextId": "\(context_id_map[circuitName] ?? 0)"];
    resolve(resolveData)
  }
  
  @objc(loggerTest:resolver:rejecter:)
  func loggerTest(_ name: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let str = name
    if (str != "") {
      resolve(str)
    } else {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("event_failure", "no str returned", error)
    }
  }
  
  @objc
  func testMethod() -> Void {
    print("Print test message [libsnark_wrapper.swift] ")
  }
  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["projectName": "ModuleName"]
  }
  
  @objc(createCircuitContext:treeHeight:hashType:serializeFormat:ecSelection:resolver:rejecter:)
  func createCircuitContext(_ circuitName: String, treeHeight: String, hashType: String,  serializeFormat: Int32 = serializeFormatZKlay, ecSelection: Int32 = EC_ALT_BN128, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let _circuitName = CString(circuitName)
    let contextId: Int32 = CSnark.createCircuitContext(_circuitName.char(),
                                                       R1CS_GG,
                                                       ecSelection,
                                                       CString("").char(),
                                                       CString("").char(),
                                                       CString("").char())
    context_id_map[circuitName] = contextId;
    context_id = contextId;
    
    let _treeHeight = CString(treeHeight)
    let _hashType = CString(hashType)
    
    CSnark.serializeFormat(contextId , serializeFormat )
    CSnark.assignCircuitArgument(contextId, CString("treeHeight").char(), _treeHeight.char())
    CSnark.assignCircuitArgument(contextId, CString("hashType").char(), _hashType.char())
    
    let resolveData: [String: String] = ["circuitName": circuitName, "contextId": "\(contextId)"]
    resolve(resolveData)
  }
  
  @objc(createGenTradeCircuitContext:serializeFormat:ecSelection:resolver:rejecter:)
  func createGenTradeCircuitContext(_ circuitName: String, serializeFormat: Int32 = serializeFormatZKlay, ecSelection: Int32 = EC_ALT_BN128, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let _circuitName = CString(circuitName)
    let contextId: Int32 = CSnark.createCircuitContext(_circuitName.char(),
                                                       R1CS_GG,
                                                       ecSelection,
                                                       CString("").char(),
                                                       CString("").char(),
                                                       CString("").char())
    context_id_map[circuitName] = contextId;
    context_id = contextId;
    
    CSnark.serializeFormat(contextId , serializeFormat )
    
    let resolveData: [String: String] = ["circuitName": circuitName, "contextId": "\(contextId)"]
    resolve(resolveData)
  }
  
  @objc(buildCircuit:rejecter:)
  func buildCircuit(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.buildCircuit(context_id)
    if (rtn != 0) {
      reject("event_failure","buildCircuit: \(rtn), \(lastmsg(contextId:context_id))", Errors.buildCircuitError)
    }
    let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
    resolve(resolveData)
  }
  
  @objc(runSetup:rejecter:)
  func runSetup(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.runSetup(context_id);
    if (rtn != 0) {
      reject("event_failure","runSetupError: \(rtn), \(lastmsg(contextId:context_id))", Errors.runSetupError)
    }
    let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
    resolve(resolveData)
  }
  
  @objc(runProof:rejecter:)
  func runProof(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.runProof(context_id)
    if (rtn != 0) {
      reject("event_failure","runSetupError: \(rtn), \(lastmsg(contextId:context_id))", Errors.runProofError)
    }
    let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
    resolve(resolveData)
  }
  
  @objc(runVerify:rejecter:)
  func runVerify(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.runVerify(context_id)
    if (rtn != 0) {
      reject("event_failure","runVerifyError: \(rtn), \(lastmsg(contextId:context_id))", Errors.runProofError)
    }
    let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
    resolve(resolveData)
  }
  
  @objc(setProof:resolver:rejecter:)
  func setProof(proofJsonStr: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.deSerializeProof(context_id, CString(proofJsonStr).char())
    if (rtn != 0) {
      reject("event_failure","runSetupError: \(rtn), \(lastmsg(contextId:context_id))", Errors.runProofError)
    }
    let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
    resolve(resolveData)
  }
  
  @objc(getVerifyKeyJson:rejecter:)
  func getVerifyKeyJson(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    if let Cstr : UnsafePointer<CChar> = CSnark.serializeVerifyKey( context_id ){
      resolve (String(cString: ( Cstr )))
    } else{
      reject("event_failure","serializeVerifyKeyError", Errors.serializeVerifyKeyError)
    }
  }
  
  @objc(getProofJson:rejecter:)
  func getProofJson(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    if let Cstr : UnsafePointer<CChar> = CSnark.serializeProof( context_id ){
      resolve (String(cString: ( Cstr )))
    } else{
      reject("event_failure","serializeProofError", Errors.serializeProofError)
    }
  }
  
  @objc(writeVerifyKeyToFile:resolver:rejecter:)
  func writeVerifyKeyToFile(filePath: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.writeVK( context_id , CString( Bundle.main.bundlePath + filePath).char() )
    if (rtn != 0){
      reject("event_failure","writeVerifyKeyToFile: \(rtn), \(lastmsg(contextId:context_id))", Errors.writeVerifyKeyToFileError)
    } else{
      let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
      resolve(resolveData)
    }
  }
  
  @objc(readVerifyKeyFromFile:resolver:rejecter:)
  func readVerifyKeyFromFile(filePath: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.readVK( context_id , CString( Bundle.main.bundlePath + filePath).char() )
    if (rtn != 0){
      reject("event_failure","readVerifyKeyFromFile: \(rtn), \(lastmsg(contextId:context_id))", Errors.readVerifyKeyFromFileError)
    } else{
      let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
      resolve(resolveData)
    }
  }
  
  @objc(writeProofKeyToFile:resolver:rejecter:)
  func writeProofKeyToFile(filePath: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.writePK( context_id , CString( Bundle.main.bundlePath + filePath).char() )
    if (rtn != 0){
      reject("event_failure","writeProofKeyToFile: \(rtn), \(lastmsg(contextId:context_id))", Errors.writeProofKeyToFileError)
    } else{
      let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
      resolve(resolveData)
    }
  }
  
  @objc(readProofKeyFromFile:resolver:rejecter:)
  func readProofKeyFromFile(filePath: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.readPK( context_id , CString( Bundle.main.bundlePath + filePath).char() )
    if (rtn != 0){
      reject("event_failure","readProofKeyFromFile: \(rtn), \(lastmsg(contextId:context_id))", Errors.readProofKeyFromFileError)
    } else{
      let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
      resolve(resolveData)
    }
  }
  
  @objc(finalizeCircuit:rejecter:)
  func finalizeCircuit(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    CSnark.finalizeCircuit(context_id)
    resolve("Done")
  }
  
  @objc(setInput:hexValue:resolver:rejecter:)
  public func setInput(key : String , hexValue : String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock ) -> Void {
    let rtn = CSnark.updatePrimaryInputStr( context_id , CString(key).char() , CString(hexValue).char() )
    if rtn == 1 {
      reject("event_failure","setInput: \(rtn), \(lastmsg(contextId:context_id))", Errors.invalidPrimaryInputKey(invalidKey: key )
)
    } else {
      let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
      resolve(resolveData)
      
    }
  }
  
  
  @objc(setInputArray:arrayIdx:hexValue:resolver:rejecter:)
  public func setInputArray( key : String , arrayIdx : Int , hexValue : String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock ) -> Void {
    
    let rtn = CSnark.updatePrimaryInputArrayStr(
      context_id ,
      CString(key).char() ,
      Int32(arrayIdx) ,
      CString(hexValue).char())
    
    if rtn == 1 {
      reject("event_failure","setInputArray: \(rtn), \(lastmsg(contextId:context_id))", Errors.invalidPrimaryInputKey(invalidKey: key ))
    } else if rtn == 2 {
      reject("event_failure","setInputArray: \(rtn), \(lastmsg(contextId:context_id))", Errors.invalidPrimaryInputIndex(invalidIndex: arrayIdx , forKey : key ))
    } else {
      let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
      resolve(resolveData)
    }
    
  }

  @objc(setInputJsonString:resolver:rejecter:)
  public func setInputJsonString(  jsonStr: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let rtn = CSnark.updatePrimaryInputFromJson(context_id, CString(jsonStr).char())
    
    if(rtn != 0) {
      reject("event_failure","setInputJsonString: \(rtn), \(lastmsg(contextId:context_id))", Errors.invalidPrimaryInputJson(invalidJson: jsonStr ))
    } else {
      let resolveData: [String: String] = ["lastmsg": lastmsg(contextId:context_id), "contextId": "\(context_id)", "rtn": "\(rtn)"]
      resolve(resolveData)
    }
  }
  
  func lastmsg( contextId: Int32) -> String {
    if let msgc : UnsafePointer<CChar> = getLastFunctionMsg( contextId ) {
      return String(cString: (msgc ))
    }else{
      return ""
    }
  }
  
  public enum Errors : Error {
    case unknownCircuitName
    case buildCircuitError
    case runSetupError
    case runProofError
    case writeVerifyKeyToFileError
    case readVerifyKeyFromFileError
    case writeProofKeyToFileError
    case readProofKeyFromFileError
    case serializeVerifyKeyError
    case serializeProofError
    case invalidPrimaryInputJson( invalidJson: String )
    case invalidPrimaryInputKey( invalidKey : String )
    case invalidPrimaryInputIndex( invalidIndex: Int , forKey : String )
  }
  
  class CString {
    
    var ns_string : NSString
    
    init(){
      ns_string = ""
    }
    
    init( _ base : String ) {
      ns_string = base as NSString
    }
    
    public func char() -> UnsafePointer<CChar>? {
      return UnsafePointer<CChar>( ns_string.utf8String )
    }
    
    public func str() -> String {
      return String(ns_string)
    }
    
  }
  
}
