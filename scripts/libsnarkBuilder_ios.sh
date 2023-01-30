#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKING_DIR="${__dir}/.."
LIBSNARK_DIR="${WORKING_DIR}/depends/libsnark-optimization"
IOS_DIR="${WORKING_DIR}/ios"

echo "$WORKING_DIR"
echo "$LIBSNARK_DIR"

echo "WORKING_DIR: $WORKING_DIR"
echo "LIBSNARK_DIR: $LIBSNARK_DIR"

cd "${LIBSNARK_DIR}" || { echo "Cannot find ${LIBSNARK_DIR}"; exit 1; } && make release=yes ios

mkdir -p ${IOS_DIR}/native_libs/iphoneos_release
mkdir -p ${IOS_DIR}/native_libs/iphonesimulator_release
mkdir -p ${IOS_DIR}/native_libs/iphoneos_debug
mkdir -p ${IOS_DIR}/native_libs/iphonesimulator_debug

cp ${LIBSNARK_DIR}/lib/ios_release/lib/libSnark_iphoneos.a ${IOS_DIR}/native_libs/iphoneos_release/libSnark.a
cp ${LIBSNARK_DIR}/lib/ios_release/lib/libSnark_iphonesimulator.a ${IOS_DIR}/native_libs/iphonesimulator_release/libSnark.a

cp ${LIBSNARK_DIR}/lib/ios_debug/lib/libSnark_iphoneos.a ${IOS_DIR}/native_libs/iphoneos_debug/libSnark.a
cp ${LIBSNARK_DIR}/lib/ios_debug/lib/libSnark_iphonesimulator.a ${IOS_DIR}/native_libs/iphonesimulator_debug/libSnark.a

cd ${WORKING_DIR} || { echo "Cannot find ${WORKING_DIR}"; exit 1; }

echo "finish!"
