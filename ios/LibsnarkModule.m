//
//  LibsnarkModule.m
//  dataTradeApp
//
//  Created by 김경빈 on 2023/01/31.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LibsnarkModule, NSObject)

RCT_EXTERN_METHOD(getContextId:(NSString *)circuitName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setContextId:(NSString *)circuitName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(loggerTest:(NSString *)name resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(testMethod)

RCT_EXTERN_METHOD(createCircuitContext:(NSString *)circuitName treeHeight:(NSString *)treeHeight hashType:(NSString *)hashType serializeFormat:(NSInteger)serializeFormat ecSelection:(NSInteger)ecSelection resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(buildCircuit:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(runSetup:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(runProof:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(runVerify:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getVerifyKeyJson:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getProofJson:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setProof:(NSString *)proofJsonStr  resolver:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(writeVerifyKeyToFile:(NSString *)filePath
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(readVerifyKeyFromFile:(NSString *)filePath
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(writeProofKeyToFile:(NSString *)filePath
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(readProofKeyFromFile:(NSString *)filePath
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(finalizeCircuit:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setInput:(NSString *)key
    hexValue:(NSString *)hexValue
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setInputArray:(NSString *)key
    arrayIdx:(NSInteger)arrayIdx
    hexValue:(NSString *)hexValue
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setInputJsonString:(NSString *)jsonStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end

