

#define USING_SWIFT_WRAPPER
#define USING_C_WRAPPER
#define CIRCUIT_BUILDER_CRV


#pragma once

#include <stdio.h>
#include <string.h>


#ifdef __cplusplus
extern "C" {
#endif
    
    /*
     *
     *  See https://github.com/snp-labs/libsnark-optimization/blob/master/api.hpp
     *
     */

    int createCircuitContext(const char * circuit_name ,
                             int proof_system ,
                             int ec_selection ,
                             const char * arith_text_path ,
                             const char * inputs_text_path ,
                             const char * cs_file_path );

    int assignCircuitArgument(int context_id , const char * arg_key , const char * arg_value  );
    
    int buildCircuit(int context_id );
    int runSetup( int context_id );
    int runProof( int context_id );
    int runVerify( int context_id );
    
    int updatePrimaryInput(int context_id , const char* input_name , int value );
    int updatePrimaryInputStr(int context_id , const char* input_name , const char * value_str );
    int updatePrimaryInputArray(int context_id , const char* input_name , int array_index, int value );
    int updatePrimaryInputArrayStr(int context_id , const char* input_name , int array_index, const char * value_str );
    int resetPrimaryInputArray(int context_id , const char* input_name , int value );
    int resetPrimaryInputArrayStr(int context_id , const char* input_name , const char * value_str );
    int updatePrimaryInputFromJson(int context_id , const char* input_json_string );
    
    int writeConstraintSystem(int context_id , const char* file_name , int use_compression , const char* checksum_prefix );
    int verifyConstraintSystemFileChecksum(int context_id , const char* file_name , const char* checksum_prefix ) ;

    int writeCircuitToFile(int context_id , const char* file_name);
    int writeInputsToFile(int context_id , const char* file_name);

    int writeVK(int context_id , const char* file_name);
    int readVK(int context_id , const char* file_name);

    int writePK(int context_id , const char* file_name);
    int readPK(int context_id , const char* file_name);

    int writeProof(int context_id , const char* file_name);
    int readProof(int context_id , const char* file_name);

    const char* serializeVerifyKey(int context_id );
    int deSerializeVerifyKey(int context_id , const char* json_string);

    const char* serializeProofKey(int context_id );
    int deSerializeProofKey(int context_id , const char* json_string);

    const char* serializeProof(int context_id );
    int deSerializeProof(int context_id , const char* json_string);

    int serializeFormat( int context_id , int format ) ;
    
    int finalizeCircuit(int context_id );
    int finalizeAllCircuit();

    const char * getLastFunctionMsg(int context_id);

#ifdef __cplusplus
}
#endif




#ifdef __cplusplus
extern "C" {
#endif

    #include "gmp.h"

    //
    // MiMC7 Hash
    //
    void mimc7_hash( mpz_ptr dst , mpz_srcptr input , mpz_srcptr fieldPrime );
    
    void mimc7_hash_from_array_inputs( mpz_ptr dst , const MP_INT* inputs , int inputs_count , mpz_srcptr fieldPrime );
    
    //
    // Merkle Tree Path
    //
    void merkle_tree_path_make_root( mpz_ptr dst ,
                                     mpz_srcptr directionSelector ,
                                     mpz_srcptr leafWires ,
                                     const MP_INT* intermediateHashes ,
                                     int intermediateHashes_count ,
                                     int treeHeight ,
                                     mpz_srcptr FIELD_PRIME ) ;

    //
    //  Curve25519
    //
    void Curve25519_init ( mpz_ptr dst_x , mpz_ptr dst_y , mpz_ptr self_x , int isMatch_ressol  );
    void Curve25519_add ( mpz_ptr dst_x , mpz_ptr dst_y , mpz_ptr self_x , mpz_ptr self_y , mpz_ptr other_x , mpz_ptr other_y);
    void Curve25519_sub ( mpz_ptr dst_x , mpz_ptr dst_y , mpz_ptr self_x , mpz_ptr self_y , mpz_ptr other_x , mpz_ptr other_y );
    void Curve25519_mul ( mpz_ptr dst_x , mpz_ptr dst_y , mpz_ptr self_x , mpz_ptr self_y , mpz_srcptr exp_mpz ) ;
    int Curve25519_isMatchRessol ( mpz_srcptr self_x , mpz_srcptr self_y ) ;

#ifdef __cplusplus
}
#endif
