
import Foundation
import CSnark


public class CircuitContext {
    
    public static let serializeFormatDefault : Int32 = 1
    public static let serializeFormatCRV     : Int32 = 2
    public static let serializeFormatZKlay   : Int32 = 3
    
    public static let R1CS_GG     : Int32 = 1
    public static let R1CS_ROM_SE : Int32 = 2
    
    public static let EC_ALT_BN128 : Int32 = 1
    public static let EC_BLS12_381 : Int32 = 2
    
    
    private let circuit_name : CString
    var circuitName : String { get { return circuit_name.str() } }
    
    private var context_id : Int32
    var contextID : Int { get { return Int(context_id) } }
    
    var circuit_is_ready : Bool
    
    let ec_selection : Int32
    

    public init ( _ circuitName : String ,
                  ecSelection : Int32 = EC_ALT_BN128 ,
                  cs_file_path : String = "" ,
                  serializeFormat : Int32 = serializeFormatDefault )
    {
        
        circuit_name = CString(circuitName)
        
        circuit_is_ready = false
        
        ec_selection = ecSelection

        context_id = CSnark.createCircuitContext( circuit_name.char() ,
                                                  CircuitContext.R1CS_GG ,
                                                  ec_selection ,
                                                  CString("").char(),
                                                  CString("").char(),
                                                  CString(cs_file_path).char()) ;

        CSnark.serializeFormat(context_id , serializeFormat )

        print ( "context id for \(circuitName) : \(context_id)  ,  last msg : \(lastMsg()) " )
        
    }
    
    
    public func buildCircuit() throws -> Void {
        if !circuit_is_ready {
            let rtn = CSnark.buildCircuit( context_id ) ;
            if rtn != 0 { throw Errors.buildCircuitError }
            circuit_is_ready = (rtn == 0) ? true : false ;
            print ( "buildCircuit : \(context_id) , \(circuitName) , \(rtn) \"\(lastMsg())\" " )
        }
    }
    
    public func runSetup() throws -> Void  {
        let rtn = CSnark.runSetup(context_id) ;
        if rtn != 0 { throw Errors.runSetupError }
        print ( "runSetup : \(context_id) , \(circuitName) , \(rtn) \"\(lastMsg())\" " )
    }
    
    public func runProof() throws -> Void {
        let rtn = CSnark.runProof(context_id) ;
        if rtn != 0 { throw Errors.runProofError }
        print ( "runProof : \(context_id) , \(circuitName) , \(rtn) \"\(lastMsg())\" " )
    }
    
    public func runVerify() throws -> Void {
        let rtn = CSnark.runVerify(context_id) ;
        if rtn != 0 { throw Errors.runVerifyError }
        print ( "runProof : \(context_id) , \(circuitName) , \(rtn) \"\(lastMsg())\" " )
    }
    
    
    
    public func getConstraintSystem( path : String , use_compression : Bool = true , checksum_prefix : String = "" ) throws -> Void {
        let rtn = CSnark.writeConstraintSystem(
                        context_id ,
                        CString(path).char(),
                        (use_compression) ? 1 : 0 ,
                        CString(checksum_prefix).char() )
        if rtn != 0 { throw Errors.writeConstraintSystemError }
    }
    
    
    
    public func getProofKey( path : String ) throws -> Void {
        let rtn = CSnark.writePK( context_id , CString(path).char() ) ;
        if rtn != 0 { throw Errors.writeProofKeyToFileError }
    }
    
    public func setProofKey( path : String ) throws -> Void {
        let rtn = CSnark.readPK( context_id , CString(path).char() ) ;
        if rtn != 0 { throw Errors.readProofKeyFromFileError }
    }
    
    
    public func getVerifyKey( path : String ) throws -> Void {
        let rtn = CSnark.writeVK( context_id , CString(path).char() ) ;
        if rtn != 0 { throw Errors.writeVerifyKeyToFileError }
    }
    
    public func setVerifyKey( path : String ) throws -> Void {
        let rtn = CSnark.readVK( context_id , CString(path).char() ) ;
        if rtn != 0 { throw Errors.readVerifyKeyFromFileError }
    }
    
    public func getVerifyKey() throws -> String {
        if let Cstr : UnsafePointer<CChar> = CSnark.serializeVerifyKey( context_id ){
            return String(cString: ( Cstr ))
        }else{
            throw Errors.serializeVerifyKeyError
        }
    }
    
    public func setVerifyKey( json : String ) throws -> Void {
        let rtn = CSnark.deSerializeVerifyKey( context_id , CString(json).char() ) ;
        if rtn != 0 { throw Errors.deSerializeVerifyKeyError }
    }
    
    
    public func getProof( path : String ) throws -> Void {
        let rtn = CSnark.writeProof( context_id , CString(path).char() ) ;
        if rtn != 0 { throw Errors.writeProofToFileError }
    }
    
    public func setProof( path : String ) throws -> Void {
        let rtn = CSnark.readProof( context_id , CString(path).char() ) ;
        if rtn != 0 { throw Errors.readProofFromFileError }
    }

    public func getProof() throws -> String {
        if let Cstr : UnsafePointer<CChar> = CSnark.serializeProof( context_id ){
            return String(cString: ( Cstr ))
        }else{
            throw Errors.serializeProofError
        }
    }
    
    public func setProof( json : String ) throws -> Void {
        let rtn = CSnark.deSerializeProof( context_id , CString(json).char() ) ;
        if rtn != 0 { throw Errors.deSerializeProofError }
    }
    
    
    
    public func setInput( inputs_json : String ) throws -> Void {
        let rtn = CSnark.updatePrimaryInputFromJson( context_id , CString(inputs_json).char())
        if rtn != 0 { throw Errors.updatePrimaryInputFromJsonError }
    }
    
    public func setInput( key : String , hexValue : String ) throws -> Void {
        let rtn = CSnark.updatePrimaryInputStr( context_id , CString(key).char() , CString(hexValue).char() )
        if rtn == 1 {
            throw Errors.invalidPrimaryInputKey(invalidKey: key )
        }
    }
    
    public func setInput( key : String , arrayIdx : Int , hexValue : String ) throws -> Void {
        
        let rtn = CSnark.updatePrimaryInputArrayStr(
                    context_id ,
                    CString(key).char() ,
                    Int32(arrayIdx) ,
                    CString(hexValue).char())
        
        if rtn == 1 {
            throw Errors.invalidPrimaryInputKey(invalidKey: key )
        }else if rtn == 2 {
            throw Errors.invalidPrimaryInputIndex(invalidIndex: arrayIdx , forKey : key )
        }
    
    }
    
    
    
    public func lastMsg() -> String {
        if let msgc : UnsafePointer<CChar> = getLastFunctionMsg( context_id ) {
            return String(cString: (msgc ))
        }else{
            return ""
        }
    }
    
    
    public func close(){
        if context_id > 0 {
            print( "finalize context \(context_id)")
            CSnark.finalizeCircuit(context_id)
            context_id = -1
        }
    }
    
    
    deinit {
        if context_id > 0 {
            print( "deinit \(context_id)")
            CSnark.finalizeCircuit(context_id)
        }
    }
    
    
    
    public enum Errors : Error {
        
        case unknownCircuitName
        case buildCircuitError
        case verifyConstraintSystemFileChecksumError
        case buildCircuitFromCSFileError
        
        case runSetupError
        case runProofError
        case runVerifyError
        
        case writeConstraintSystemError
        
        case writeProofKeyToFileError
        case readProofKeyFromFileError
        
        case writeVerifyKeyToFileError
        case readVerifyKeyFromFileError
        case serializeVerifyKeyError
        case deSerializeVerifyKeyError
        
        case writeProofToFileError
        case readProofFromFileError
        case serializeProofError
        case deSerializeProofError
        
        case updatePrimaryInputFromJsonError
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
