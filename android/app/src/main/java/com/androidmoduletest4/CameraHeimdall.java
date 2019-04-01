package com.androidmoduletest4;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;

public class CameraHeimdall extends FrameLayout {
    private Context context;
    private Camera mCamera;
    private CameraPreview mPreview;
    static final int REQUEST_VIDEO_CAPTURE = 1;

    int cameraIndex=0;

    FrameLayout preview;

    public CameraHeimdall(Context context) {
        super(context);
        this.context = context;
        initView();
    }

    private void initView() {
        LayoutInflater layoutInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View v = layoutInflater.inflate(R.layout.layout, this, false);

        preview = v.findViewById(R.id.camera_heimdall);

        addView(v);
        String[] PERMISSIONS = {
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.CAMERA
        };

        if(!hasPermissions(context, PERMISSIONS)){
            //ActivityCompat.requestPermissions(context, PERMISSIONS, PERMISSION_ALL);
            Log.e("MyComponent","need Permissions");
        }else{
            Log.e("MyComponent","pass Permissions");
            mCamera = CameraPreview.getCameraInstance(cameraIndex);

            // Create our Preview view and set it as the content of our activity.
            mPreview = new CameraPreview(context, mCamera);

            preview.addView(mPreview);
        }

    }

    public static boolean hasPermissions(Context context, String... permissions) {
        if (context != null && permissions != null) {
            for (String permission : permissions) {
                if (ActivityCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
        }
        return true;
    }

}