package com.androidmoduletest4;

import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

public class CameraViewPackage implements ReactPackage {

    public CameraViewPackage(){

    }
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        Log.e("MyComponent", "create modules");
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new GetDataModule(reactContext));

        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        Log.e("MyComponent", "create view");
        return Collections.<ViewManager>singletonList(new CameraViewManager());
    }
}
