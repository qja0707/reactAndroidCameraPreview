package com.androidmoduletest4;

import android.net.Uri;
import android.widget.VideoView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nonnull;

public class CameraViewManager extends SimpleViewManager<CameraHeimdall> {

    @Nonnull
    @Override
    public String getName() {
        return "CameraView";
    }

    @Nonnull
    @Override
    protected CameraHeimdall createViewInstance(@Nonnull ThemedReactContext reactContext) {
        CameraHeimdall cameraHeimdall = new CameraHeimdall(reactContext);
        return cameraHeimdall;
    }
    /*
    @ReactProp(name="url")
    public void setVideoPath(VideoView videoView, String urlPath) {
        Uri uri = Uri.parse(urlPath);
        videoView.setVideoURI(uri);
        videoView.start();
    }*/
}
