package com.androidmoduletest4;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class GetDataModule extends ReactContextBaseJavaModule {
    public GetDataModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "GetData";
    }
    @ReactMethod
    public void getIsRecording(Callback booleanCallback){
        booleanCallback.invoke("null",CameraHeimdall.isRecording);
    }

    @ReactMethod
    public void getFilePath(Callback stringCallback){
        try{
            stringCallback.invoke("null",CameraHeimdall.file.getPath());
        }catch(NullPointerException e){
            stringCallback.invoke("null","null");
        }

    }
}
