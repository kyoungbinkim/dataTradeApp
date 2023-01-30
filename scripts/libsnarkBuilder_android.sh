#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKING_DIR="${__dir}/.."
LIBSNARK_DIR="${WORKING_DIR}/depends/libsnark-optimization"

ANDROID_API_LEVEL=23
ANDROID_NDK=20.0.5594570
BUILD_TYPE=release

echo "WORKING_DIR: $WORKING_DIR"
echo "LIBSNARK_DIR: $LIBSNARK_DIR"

printf "\n"
echo " * Generates libc++_shared.so"
printf "\n"

cd "${LIBSNARK_DIR}" || { echo "Cannot find ${LIBSNARK_DIR}"; exit 1; } && make release=yes android

cp ~/Library/Android/sdk/ndk/${ANDROID_NDK}/toolchains/llvm/prebuilt/darwin-x86_64/sysroot/usr/lib/aarch64-linux-android/libc++_shared.so \
    ${WORKING_DIR}/android/app/src/main/jniLibs/arm64-v8a/libc++_shared.so

printf "\n"
echo " * Generates libSnark_arm64.a"
printf "\n"

mkdir -p ${WORKING_DIR}/android/o-files
cd ${WORKING_DIR}/android/o-files || { echo "Cannot find ${LIBSNARK_DIR}/o-files"; exit 1; }

~/Library/Android/sdk/ndk/${ANDROID_NDK}/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android-ar -x -v \
    ${LIBSNARK_DIR}/lib/android_${BUILD_TYPE}/lib/libSnark_arm64.a

printf "\n"
echo " * Generates libSnark.so"
printf "\n"


~/Library/Android/sdk/ndk/${ANDROID_NDK}/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android${ANDROID_API_LEVEL}-clang++ \
    -v -flto -fuse-ld=gold -shared *.o \
    -L../app/src/main/jniLibs/arm64-v8a \
    -lssl -lcrypto -lgmp -lomp -lc++_shared -ldl -llog  \
    -o ../app/src/main/jniLibs/arm64-v8a/libSnark.so

cd ${WORKING_DIR} || { echo "Cannot find ${WORKING_DIR}"; exit 1; }

echo "finish!"
