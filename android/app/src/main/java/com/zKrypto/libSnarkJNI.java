package com.zKrypto;

public class libSnarkJNI {

    public static final String TAG = "SNARK_LOG";

    public static final int R1CS_GG = 1;
    public static final int R1CS_ROM_SE = 2;

    public static final int EC_ALT_BN128 = 1;
    public static final int EC_BLS12_381 = 2;

    public static final int serializeFormatDefault = 1;
    public static final int serializeFormatCRV = 2;
    public static final int serializeFormatZKlay = 3;

    static {
        System.loadLibrary("Snark");
    }

    public libSnarkJNI() {
    }


    /*
     *
     *  See https://github.com/snp-labs/libsnark-optimization/blob/master/api.hpp
     *
     */

    public native int createCircuitContext(String circuit_name,
                                           int proof_system,
                                           int ecSelection,
                                           String arith_text_path,
                                           String inputs_text_path,
                                           String cs_file_path);

    public native int serializeFormat(int circuit_context_id, int format);
    public native int assignCircuitArgument(int contextId, String argKey, String argValue);
    public native int buildCircuit(int circuit_context_id);

    public native int runSetup(int circuit_context_id);
    public native int runProof(int circuit_context_id);
    public native int runVerify(int circuit_context_id);

    public native int updatePrimaryInput(int context_id, String input_name, int value);
    public native int updatePrimaryInputStr(int context_id, String input_name, String value_str);
    public native int updatePrimaryInputArray(int context_id, String input_name, int array_index, int value);
    public native int updatePrimaryInputArrayStr(int context_id, String input_name, int array_index, String value_str);
    public native int updatePrimaryInputFromJson(int context_id, String json_sting);

    public native int writeConstraintSystem(int context_id, String file_name, int use_compression, String checksum_prefix);
    public native int verifyConstraintSystemFileChecksum(int context_id, String file_name, String checksum_prefix);
    public native int writeCircuitToFile(int circuit_context_id, String document_dir);
    public native int writeInputsToFile(int circuit_context_id, String document_dir);

    public native int writePK(int circuit_context_id, String document_dir);
    public native int readPK(int circuit_context_id, String document_dir);
    public native int writeVK(int circuit_context_id, String document_dir);
    public native int readVK(int circuit_context_id, String document_dir);

    public native int writeProof(int circuit_context_id, String document_dir);
    public native int readProof(int circuit_context_id, String document_dir);

    public native String serializeVerifyKey(int circuit_context_id);
    public native int deSerializeVerifyKey(int circuit_context_id, String json_string);

    public native String serializeProof(int circuit_context_id);
    public native int deSerializeProof(int circuit_context_id, String json_string);

    public native int finalizeCircuit(int circuit_context_id);
    public native String getLastFunctionMsg(int circuit_context_id);


}
