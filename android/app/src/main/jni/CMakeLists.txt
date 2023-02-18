cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(datatradeapp_appmodules)

# This file includes all the necessary to let you build your application with the New Architecture.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fopenmp -static-openmp")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fopenmp -static-openmp")
arguments "-DANDROID_ARM_MODE=arm", "-DANDROID_STL=c++_shared"
