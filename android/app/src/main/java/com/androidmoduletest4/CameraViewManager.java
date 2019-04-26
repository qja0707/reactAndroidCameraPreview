package com.androidmoduletest4;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;
import android.widget.VideoView;

import com.facebook.react.bridge.Callback;
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
    public static final int RECORD = 2;

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
        return MapBuilder.of("changeCamera",CHANGE_CAMERA,"record",RECORD);
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
                break;
            }
            case RECORD:{
                Log.e("MyComponent","android record");
                //Toast.makeText(context,"asdf",Toast.LENGTH_SHORT);
                cameraHeimdall.record(args.getString(0));
                break;
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
