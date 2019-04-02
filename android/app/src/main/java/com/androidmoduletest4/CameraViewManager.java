package com.androidmoduletest4;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;
import android.widget.VideoView;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class CameraViewManager extends SimpleViewManager<CameraHeimdall> {

    public static final int CHANGE_CAMERA = 1;

    Context context;
    CameraHeimdall cameraHeimdall;

    @Nonnull
    @Override
    public String getName() {
        return "CameraView";
    }

    @Nonnull
    @Override
    protected CameraHeimdall createViewInstance(@Nonnull ThemedReactContext reactContext) {
        CameraHeimdall cameraHeimdall = new CameraHeimdall(reactContext);
        this.cameraHeimdall = cameraHeimdall;
        this.context = reactContext;
        return cameraHeimdall;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("changeCamera",CHANGE_CAMERA);
    }

    @Override
    public void receiveCommand(@Nonnull CameraHeimdall root, int commandId, @Nullable ReadableArray args) {
        //super.receiveCommand(root, commandId, args);
        Log.e("MyComponent","1");
        switch (commandId){
            case CHANGE_CAMERA:{
                Log.e("MyComponent","3"+context);
                //Toast.makeText(context,"asdf",Toast.LENGTH_SHORT);
                cameraHeimdall.cameraChange();
                return;
            }
        }

    }
    /*
    @ReactProp(name="url")
    public void setVideoPath(VideoView videoView, String urlPath) {
        Uri uri = Uri.parse(urlPath);
        videoView.setVideoURI(uri);
        videoView.start();
    }*/
}
