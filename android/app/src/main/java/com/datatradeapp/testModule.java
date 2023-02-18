package com.datatradeapp;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class testModule extends ReactContextBaseJavaModule {

    testModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public  String getName(){
        return "testModule";
    }

    @ReactMethod
    public  void helloWorld( Promise promise) {
        promise.resolve("HELLO");
    }
}
