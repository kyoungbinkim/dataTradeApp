package com.datatradeapp;

import android.content.res.AssetManager;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;

import com.zKrypto.libSnarkJNI;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class LibsnarkModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactApplicationContext;
    private String crsDefaultPath = "";
    private int contextId = 0;
    private final Map<String, Integer> contextIdMap = new HashMap<String, Integer>(){{
        put("ZKlay", 0);
        put("ZKlay_nft", 0);
        put("GenTrade", 0);
    }};

    public libSnarkJNI snarkJNI = new libSnarkJNI();

    static int serializeFormatDefault = 1;
    static int serializeFormatCRV = 2;
    static int serializeFormatZKlay = 3;

    static int R1CS_GG = 1;
    static int R1CS_ROM_SE = 2;


    LibsnarkModule(ReactApplicationContext context) {
        super(context);
        this.reactApplicationContext = context;
        this.crsDefaultPath = context.getFilesDir().getAbsolutePath();
    }

    @Override
    public String getName() {
        return "LibsnarkModule";
    }

    @ReactMethod
    public void getContextId(String circuitName, Promise promise) {
        WritableMap resolveData = new WritableNativeMap();

        Integer retContextId = contextIdMap.get(circuitName);
        resolveData.putString("contextId", Integer.toString(retContextId == null ? 0 : retContextId));

        promise.resolve(resolveData);
    }

    @ReactMethod
    public void setContextId(String circuitName, Promise promise) {
        WritableMap resolveData = new WritableNativeMap();

        Integer retContextId = contextIdMap.get(circuitName);
        contextId = retContextId == null ? 0 : retContextId;
        resolveData.putString("contextId", Integer.toString(contextId));

        promise.resolve(resolveData);
    }


    @ReactMethod
    public void loggerTest(String name, Promise promise) {
        if (name.compareTo("") != 0) {
            promise.resolve(name);
        } else {
            Error error = new Error("Name: null");
            promise.reject("event_failure", "no str returned", error);
        }
    }

    @ReactMethod
    public void testMethod() {
        Log.d("info", "Print test message [libsnarkModule.java] ");
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT_EVENT_NAME", "New Event");
        return constants;
    }

    @ReactMethod
    public void createCircuitContext(String circuitName, String treeHeight, String hashType, int serializeFormat, int ecSelection, Promise promise) {
        int _contextId = snarkJNI.createCircuitContext(circuitName, R1CS_GG, ecSelection, "", "", "");

        contextId = _contextId;
        contextIdMap.put(circuitName, _contextId);

        snarkJNI.serializeFormat(_contextId, serializeFormat);
        snarkJNI.assignCircuitArgument(_contextId, "treeHeight", treeHeight);
        snarkJNI.assignCircuitArgument(_contextId, "hashType", hashType);

        AssetManager assetManager = reactApplicationContext.getResources().getAssets();
        InputStream pkIs = null;
        InputStream vkIs = null;
        try {
            pkIs = assetManager.open("crs/" + circuitName + "_crs_pk.dat");
            vkIs = assetManager.open("crs/" + circuitName + "_crs_vk.dat");
            long pkFileSize = pkIs.available();
            long vkFileSize = vkIs.available();

            if (pkFileSize > 0 && vkFileSize > 0) {

                byte[] tempPkData = new byte[(int) pkFileSize];
                byte[] tempVkData = new byte[(int) vkFileSize];

                int pkLen = pkIs.read(tempPkData);
                int vkLen = vkIs.read(tempVkData);

                // copy CRS
                File crsDir = new File(crsDefaultPath + "/crs");

                if (!crsDir.exists()) {
                    crsDir.mkdir();
                }
                File pkOutFile = new File(crsDir + "/" + circuitName + "_crs_pk.dat");
                File vkOutFile = new File(crsDir + "/" + circuitName + "_crs_vk.dat");

                if (!pkOutFile.exists() || !vkOutFile.exists()) {
                    boolean a = pkOutFile.createNewFile();
                    boolean b = vkOutFile.createNewFile();
                }

                FileOutputStream pkFW = new FileOutputStream(pkOutFile, false);
                FileOutputStream vkFW = new FileOutputStream(vkOutFile, false);

                while (pkLen != -1) {
                    pkFW.write(tempPkData, 0, pkLen);
                    pkLen = pkIs.read(tempPkData);
                }
                pkFW.flush();
                pkFW.close();
                pkIs.close();

                while (vkLen != -1) {
                    vkFW.write(tempVkData, 0, vkLen);
                    vkLen = vkIs.read(tempVkData);
                }
                vkFW.flush();
                vkFW.close();
                vkIs.close();
            }
        } catch (Exception e) {
            Log.e("Exception", String.valueOf(e));
            promise.reject(e);
        }

        WritableMap resolveData = new WritableNativeMap();
        resolveData.putString("circuitName", circuitName);
        resolveData.putString("contextId", Integer.toString(_contextId));
        promise.resolve(resolveData);
    }

    @ReactMethod
    public void buildCircuit(Promise promise) {
        int rtn = snarkJNI.buildCircuit(contextId);
        if (rtn != 0) {
            promise.reject("event_failure", "buildCircuitError" + snarkJNI.getLastFunctionMsg(contextId));
        }

        WritableMap resolveData = new WritableNativeMap();
        resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
        resolveData.putString("contextId", Integer.toString(contextId));
        resolveData.putString("rtn", Integer.toString(rtn));
        promise.resolve(resolveData);
    }

    @ReactMethod
    public void runSetup(Promise promise) {
        int rtn = snarkJNI.runSetup(contextId);
        if (rtn != 0) {
            promise.reject("event_failure", "runSetupError" + snarkJNI.getLastFunctionMsg(contextId));
        }

        WritableMap resolveData = new WritableNativeMap();
        resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
        resolveData.putString("contextId", Integer.toString(contextId));
        resolveData.putString("rtn", Integer.toString(rtn));
        promise.resolve(resolveData);
    }

    @ReactMethod
    public void runProof(Promise promise) {
        int rtn = snarkJNI.runProof(contextId);
        if (rtn != 0) {
            promise.reject("event_failure", "runProofError" + snarkJNI.getLastFunctionMsg(contextId));
        }

        WritableMap resolveData = new WritableNativeMap();
        resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
        resolveData.putString("contextId", Integer.toString(contextId));
        resolveData.putString("rtn", Integer.toString(rtn));
        promise.resolve(resolveData);
    }

    @ReactMethod
    public void runVerify(Promise promise) {
        int rtn = snarkJNI.runVerify(contextId);
        if (rtn != 0) {
            promise.reject("event_failure", "runVerifyError" + snarkJNI.getLastFunctionMsg(contextId));
        }

        WritableMap resolveData = new WritableNativeMap();
        resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
        resolveData.putString("contextId", Integer.toString(contextId));
        resolveData.putString("rtn", Integer.toString(rtn));
        promise.resolve(resolveData);
    }

    @ReactMethod
    public void setProof(String proofJsonStr, Promise promise) {
        int rtn = snarkJNI.deSerializeProof(contextId, proofJsonStr);
        if (rtn != 0) {
            promise.reject("event_failure", "setProofError" + snarkJNI.getLastFunctionMsg(contextId));
        }

        WritableMap resolveData = new WritableNativeMap();
        resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
        resolveData.putString("contextId", Integer.toString(contextId));
        resolveData.putString("rtn", Integer.toString(rtn));
        promise.resolve(resolveData);
    }

    @ReactMethod
    public void getVerifyKeyJson(Promise promise) {
        String vk = snarkJNI.serializeVerifyKey(contextId);
        promise.resolve(vk);
    }

    @ReactMethod
    public void getProofJson(Promise promise) {
        String proofStr = snarkJNI.serializeProof(contextId);

        if (proofStr.isEmpty()) {
            promise.reject("event_failure", "serializeProofError" + snarkJNI.getLastFunctionMsg(contextId));
        } else {
            promise.resolve(proofStr);
        }
    }

    @ReactMethod
    public void writeVerifyKeyToFile(String filePath, Promise promise) {
        int rtn = snarkJNI.writeVK(contextId, crsDefaultPath + filePath);
        if (rtn != 0) {
            promise.reject("event_failure", "writeVerifyKeyToFileError in " + crsDefaultPath + filePath + " : " + snarkJNI.getLastFunctionMsg(contextId));
        } else {

            WritableMap resolveData = new WritableNativeMap();
            resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
            resolveData.putString("contextId", Integer.toString(contextId));
            resolveData.putString("rtn", Integer.toString(rtn));
            promise.resolve(resolveData);
        }
    }

    @ReactMethod
    public void readVerifyKeyFromFile(String filePath, Promise promise) {
        int rtn = snarkJNI.readVK(contextId, crsDefaultPath + filePath);
        if (rtn != 0) {

            promise.reject("event_failure", "readVerifyKeyFromFile in " + crsDefaultPath + filePath + " : " + snarkJNI.getLastFunctionMsg(contextId));
        } else {

            WritableMap resolveData = new WritableNativeMap();
            resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
            resolveData.putString("contextId", Integer.toString(contextId));
            resolveData.putString("rtn", Integer.toString(rtn));
            promise.resolve(resolveData);
        }
    }

    @ReactMethod
    public void writeProofKeyToFile(String filePath, Promise promise) {
        int rtn = snarkJNI.writePK(contextId, crsDefaultPath + filePath);
        if (rtn != 0) {
            promise.reject("event_failure", "writeProofKeyToFile in " + crsDefaultPath + filePath + " : " + snarkJNI.getLastFunctionMsg(contextId));
        } else {

            WritableMap resolveData = new WritableNativeMap();
            resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
            resolveData.putString("contextId", Integer.toString(contextId));
            resolveData.putString("rtn", Integer.toString(rtn));
            promise.resolve(resolveData);
        }
    }

    @ReactMethod
    public void readProofKeyFromFile(String filePath, Promise promise) {
        int rtn = snarkJNI.readPK(contextId, crsDefaultPath + filePath);
        if (rtn != 0) {
            promise.reject("event_failure", "readProofKeyFromFile in " + crsDefaultPath + filePath + " : " + snarkJNI.getLastFunctionMsg(contextId));
        } else {

            WritableMap resolveData = new WritableNativeMap();
            resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
            resolveData.putString("contextId", Integer.toString(contextId));
            resolveData.putString("rtn", Integer.toString(rtn));
            promise.resolve(resolveData);
        }
    }

    @ReactMethod
    public void finalizeCircuit(Promise promise) {
        snarkJNI.finalizeCircuit(contextId);
        promise.resolve("Done");
    }

    @ReactMethod
    public void setInput(String key, String hexValue, Promise promise) {
        // TODO
        promise.reject("event_failure", "setInputError: not supported in android");
    }


    @ReactMethod
    public void setInputArray(String key, int arrayIdx, String hexValue, Promise promise) {
        // TODO
        promise.reject("event_failure", "setInputArrayError: not supported in android");
    }

    @ReactMethod
    public void setInputJsonString(String jsonStr, Promise promise) {
        int rtn = snarkJNI.updatePrimaryInputFromJson(contextId, jsonStr);

        if (rtn != 0) {
            promise.reject("event_failure", "setInputJsonString" + snarkJNI.getLastFunctionMsg(contextId));
        } else {
            WritableMap resolveData = new WritableNativeMap();
            resolveData.putString("lastmsg", snarkJNI.getLastFunctionMsg(contextId));
            resolveData.putString("contextId", Integer.toString(contextId));
            resolveData.putString("rtn", Integer.toString(rtn));
            promise.resolve(resolveData);
        }
    }

    public String lastmsg(int contextId) {
        String msg = snarkJNI.getLastFunctionMsg(contextId);
        if (!msg.isEmpty()) {
            return msg;
        } else {
            return "";
        }
    }

}
